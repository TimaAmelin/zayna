import json
import random
from enum import Enum

from django.conf import settings
from django.db.models import Subquery, OuterRef, When, Case, F, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .config import GAME_PRICE, SOCIAL_NETWORK_PRICE
from .models import *


def welcome_gift(user):
    logging.info(f"Checking welcome gift for user {user.id}...")

    # Get or create user Zayna
    zayna, created = User.objects.get_or_create(username="zayna")

    # Get or create the welcome gift project
    gift_project, created = Project.objects.get_or_create(
        name="Welcome gift",
        defaults={
            'mode': None,
            'payment': 100000,
            'description': "We thank you for caring about our planet and give you 100,000 coins for development"
        }
    )

    if user.participates.filter(project=gift_project).exists():
        logging.info(f"User {user.id} has already got welcome gift!")
        return None

    # Create the present
    present, created = Present.objects.get_or_create(sender=zayna, receiver=user, project=gift_project)
    present.shown = False
    present.save(update_fields=["shown"])

    # Log the creation of the welcome gift
    logging.info(f"Welcome gift for user {user.id} created!")
    return present


def add_user(id, username, referrer_id, photo):
    id = int(id)
    if id == referrer_id:
        logging.warning(f"User {id} tries to refer himself")
        return JsonResponse({"status": "ERROR", "message": "User can not refer himself"}, status=400)
    user_qs = User.objects.filter(id=id)
    referrer_qs = User.objects.filter(id=referrer_id)
    if user_qs.exists():
        user = user_qs.first()
        logging.info(f"User {id} already exists")
        if not referrer_qs.exists():
            logging.info(f"Referrer {referrer_id} does not exist")
        if referrer_id:
            user.friends.add(referrer_qs.first())
        if not user.photo or user.photo != photo:
            user.photo = photo
            user.save(update_fields=["photo"])
        welcome_gift(user)
        presents = list(user.presents.filter(shown=False).values(
            "id",
            "project__id",
            "project__name",
            "project__mode",
            "project__description",
            "project__logo",
            "project__name",
            "sender__username",
        ))
        logging.info("presents: %s", str(presents))
        user.presents.filter(shown=False).update(shown=True)
        return JsonResponse({"presents": presents}, status=204)
    else:
        if not referrer_qs.exists():
            logging.info(f"Referrer {referrer_id} does not exist")
            referrer_id = None
        logging.info(
            f"Create user {id} with username {username}" + (f" by referrer {referrer_id}" if referrer_id else "")
        )
        if referrer_id:
            user = User.objects.create(username=username, id=id, referrer=referrer_qs.first(), photo=photo)
        else:
            user = User.objects.create(username=username, id=id, photo=photo)
        if referrer_id:
            user.friends.add(referrer_qs.first())
        welcome_gift(user)
        presents = list(user.presents.filter(shown=False).values(
            "id",
            "project__id",
            "project__name",
            "project__mode",
            "project__description",
            "project__logo",
            "project__name",
            "sender__username",
        ))
        user.presents.filter(shown=False).update(shown=True)
        return JsonResponse({"presents": presents}, status=201)


def add_tokens_batch(user_id, tokens_count):
    id = int(user_id)
    user = get_object_or_404(User, id=id)
    TokensBatch.objects.create(user_id=user.id, tokens_count=tokens_count)
    message = f"TokensBatch object created (user_id={user_id}, tokens_count={tokens_count})"
    logging.info(message)
    return JsonResponse({"message": message}, status=201)


def get_tokens_count(user_id):
    id = int(user_id)
    user = get_object_or_404(User, id=id)
    user.add_income()
    user.process_old_batches()

    current_tokens = int(user.tokens_count)

    presents = list(user.presents.filter(shown=False).values(
        "id",
        "project__id",
        "project__name",
        "project__mode",
        "project__description",
        "project__logo",
        "project__name",
        "sender__username",
    ))
    user.presents.filter(shown=False).update(shown=True)
    return JsonResponse(
        {
            "sum": current_tokens,
            "presents": presents,
            "name": user.name,
            "income": user.income,
            "photo": user.photo,
        },
        status=200,
    )


class GameResult(str, Enum):
    PLAYER_WIN = "player_win"
    BOT_WIN = "bot_win"
    DRAW = "draw"
    IN_PROGRESS = "in_progress"


class PlayerValue(int, Enum):
    PLAYER = 1
    BOT = -1


PLAYER_RESPONSE = lambda field: JsonResponse({"result": GameResult.PLAYER_WIN, "field": field}, status=205)
BOT_RESPONSE = lambda field: JsonResponse({"result": GameResult.BOT_WIN, "field": field}, status=205)
RESPONSE = {PlayerValue.PLAYER: PLAYER_RESPONSE, PlayerValue.BOT: BOT_RESPONSE}


def check_win(field, value):
    free_cells = []
    for i in range(3):
        if field[i][0] == field[i][1] == field[i][2] == value:
            return RESPONSE[value](field)
        elif field[0][i] == field[1][i] == field[2][i] == value:
            return RESPONSE[value](field)
        for j in range(3):
            if field[i][j] == 0:
                free_cells.append((i, j))
    if not free_cells:
        return JsonResponse({"result": GameResult.DRAW, "field": field}, status=205)

    if field[0][0] == field[1][1] == field[2][2]:
        if field[0][0] == value:
            return RESPONSE[value](field)
    elif field[0][2] == field[1][1] == field[2][0]:
        if field[1][1] == value:
            return RESPONSE[value](field)
    return free_cells


def next_step(user_id, field):
    user_id = int(user_id)
    user = get_object_or_404(User, id=user_id)

    status = check_win(field, PlayerValue.PLAYER)
    if isinstance(status, JsonResponse):
        user.last_game_at = timezone.now()
        if json.loads(status.content)["result"] == GameResult.PLAYER_WIN:
            user.tokens_count = str(int(user.tokens_count) + GAME_PRICE)
            user.last_game_won = True
            logging.info(f"User {user_id} won. Add {GAME_PRICE} tokens.")
        else:
            user.last_game_won = False
        user.save(update_fields=["tokens_count", "last_game_at", "last_game_won"])
        return JsonResponse({"field": field, "result": GameResult.PLAYER_WIN}, status=202)

    free_cells = status
    bot_step = random.choice(free_cells)
    field[bot_step[0]][bot_step[1]] = PlayerValue.BOT

    status = check_win(field, PlayerValue.BOT)
    if isinstance(status, JsonResponse):
        user.last_game_at = timezone.now()
        user.last_game_won = False
        user.save(update_fields=["last_game_at", "last_game_won"])
        return JsonResponse({"field": field, "result": GameResult.BOT_WIN}, status=202)

    return JsonResponse({"field": field, "result": GameResult.IN_PROGRESS}, status=202)


def add_present(sender_id, project_id, receiver_id=None):
    sender_id = int(sender_id)
    sender = get_object_or_404(User, id=sender_id)

    project_id = int(project_id)
    project = get_object_or_404(Project, id=project_id)

    receiver = None
    if receiver_id:
        receiver_id = int(receiver_id)
        receiver = get_object_or_404(User, id=receiver_id)

    if sender.tokens_sum < project.cost(1):
        logging.warning(f"Required {project.cost(1)}, current tokens: {sender.tokens_sum}")
        return JsonResponse({"message": "Not enough tokens"}, status=400)

    present = Present.objects.create(sender=sender, project=project, receiver=receiver)

    sender.tokens_count = str(int(sender.tokens_count) - project.cost(1))
    sender.save(update_fields=["tokens_count"])
    return JsonResponse({"present": present.pk, "link": present.link}, status=201)


def get_present(user_id, present_id):
    user_id = int(user_id)
    user = get_object_or_404(User, id=user_id)

    present_id = int(present_id)
    present = get_object_or_404(Present, id=present_id)

    if present.received:
        message = f"Present {present_id} has been already received"
        logging.info(message)
        return JsonResponse({"message": message}, status=400)

    present.received = True
    present.save(update_fields=["received"])
    logging.info(f"Process payment: {present.project.payment}")
    user.tokens_count = str(int(user.tokens_count) + present.project.payment)
    user.save(update_fields=["tokens_count"])
    participate(user_id, present.project.id, free=True)
    return JsonResponse({"message": "present has been taken"}, status=201)


def get_presents(request):
    projects = list(
        Project.objects.filter(is_present=True).values("id", "name", "mode", "description", "logo")
    )
    for project in projects:
        if project["logo"]:  # Check if the logo field is not empty
            project["logo"] = request.build_absolute_uri(settings.MEDIA_URL + project['logo'])

    return JsonResponse({"presents": projects}, status=200)


def get_user_projects(request, user_id):
    user_id = int(user_id)
    user = get_object_or_404(User, id=user_id)

    projects = list(
        Project.objects
        .annotate(
            lvl=Subquery(UserProject.objects.filter(user=user, project_id=OuterRef("id")).values("level")[:1]),
            level=Case(
                When(
                    lvl__isnull=False,
                    then=F("lvl"),
                ),
                default=0,
            ),
        )
        .values(
            "level",
            "id",
            "name",
            "mode",
            "description",
            "logo",
            "price_by_level",
            "income_by_level",
        )
    )
    for project in projects:
        level = project["level"]
        project["cost"] = (
            project["price_by_level"][level] if len(project["price_by_level"]) > level else 1e10
        )
        project["profit"] = (
            project["income_by_level"][level] if len(project["income_by_level"]) > level else 1e10
        )

    return JsonResponse({"projects": projects}, status=200)


def participate(user_id, project_id, free=False):
    user_id = int(user_id)
    user = get_object_or_404(User, id=user_id)

    project = get_object_or_404(Project, id=int(project_id))

    user_project_qs = UserProject.objects.filter(user=user, project=project)
    new_level = 0
    if user_project_qs.exists():
        new_level = user_project_qs.first().level
    if not free:
        if user.tokens_sum < project.cost(new_level):
            logging.info(f"Not enough tokens: {user.tokens_sum} < {project.cost(new_level)}")
            return JsonResponse({"result": "ERROR", "message": "Not enough tokens"}, status=400)

        user.tokens_count = str(int(user.tokens_count) - project.cost(new_level))

    user.income += project.profit(new_level)
    user.save(update_fields=["tokens_count", "income"])
    up = UserProject.objects.get_or_create(user=user, project=project)[0]
    up.level += 1
    up.save(update_fields=["level"])
    return JsonResponse({"message": "User participated"}, status=201)


def change_name(id, name):
    id = int(id)
    user = get_object_or_404(User, id=id)
    if len(name) > MAX_NANE_LENGTH:
        message = f"Name {name} is too long"
        logging.info(message)
        return JsonResponse({"message": message}, status=400)
    user.name = name
    user.save(update_fields=["name"])
    return JsonResponse({"message": "name changed"}, status=201)


def delete_user(id):
    id = int(id)
    user = get_object_or_404(User, id=id)
    user.delete()
    logging.info(f"User {id} deleted!")
    return JsonResponse({"message": "user deleted"}, status=201)


def get_friends(id):
    id = int(id)
    user = get_object_or_404(User, id=id)
    friends = list(user.friends.values("id", "username", "photo"))
    return JsonResponse({"friends": friends}, status=200)


def check_daily_reward(id):
    id = int(id)
    user = get_object_or_404(User, id=id)

    if user.daily_reward_at and timezone.now().date() - user.daily_reward_at.date() < datetime.timedelta(days=1):
        logging.info(f"User {user.id} have to wait: {user.daily_reward_at}")
        return JsonResponse({"reward": False, "combo": user.daily_combo, "last": user.daily_reward_at}, status=200)

    if not user.daily_reward_at or timezone.now().date() - user.daily_reward_at.date() == datetime.timedelta(days=1):
        logging.info(f"User {user.id} has daily reward: {user.daily_reward_at}")
        return JsonResponse({"reward": True, "combo": user.daily_combo, "last": user.daily_reward_at}, status=200)

    user.daily_combo = 0
    user.save(update_fields=["daily_combo"])
    logging.info(f"User {user.id} has failed his combo: {user.daily_reward_at}")
    return JsonResponse({"reward": True, "combo": user.daily_combo, "last": user.daily_reward_at}, status=200)


def get_daily_reward(id):
    id = int(id)
    user = get_object_or_404(User, id=id)
    if user.daily_reward_at and timezone.now().date() - user.daily_reward_at.date() < datetime.timedelta(days=1):
        logging.info(f"No daily reward for user {user.id}")
        return JsonResponse({"message": "No daily reward"}, status=400)

    user.daily_combo += 1
    user.daily_reward_at = timezone.now()
    user.save(update_fields=["daily_combo", "daily_reward_at"])
    logging.info(f"User {user.id} got daily reward. Combo: {user.daily_combo}")

    return JsonResponse({"combo": user.daily_combo}, status=201)


def check_tic_tac_toe(id):
    id = int(id)
    user = get_object_or_404(User, id=id)
    delta = datetime.timedelta(days=1) if user.last_game_won else datetime.timedelta(hours=1)
    if user.last_game_at and user.last_game_at > timezone.now() - delta:
        logging.info(f"User {id} has already played the game")
        return JsonResponse(
            {"status": "ERROR", "message": "User has already played the game", "next": user.last_game_at + delta},
            status=408,
        )
    return None


def get_stock(id):
    id = int(id)
    user = get_object_or_404(User, id=id)
    return JsonResponse(
        {"stock": user.stock},
        status=200,
    )


def set_stock(id, stock):
    id = int(id)
    user = get_object_or_404(User, id=id)
    user.stock = stock
    user.save(update_fields=["stock"])
    return JsonResponse({"message": "stock set"}, status=201)


def add_network(id, network):
    id = int(id)
    user = get_object_or_404(User, id=id)

    network_qs = user.networks.filter(name=network)
    if network_qs.exists():
        logging.info(f"User {id} has already opened network {network}")
        return JsonResponse({"message": "User has already opened this network"}, status=200)

    user.networks.create(name=network)
    user.tokens_count = str(int(user.tokens_count) + SOCIAL_NETWORK_PRICE)
    user.save(update_fields=["tokens_count"])
    return JsonResponse({"message": "network added"}, status=201)


def get_networks(id):
    id = int(id)
    user = get_object_or_404(User, id=id)

    opened_networks = user.networks.values_list("name", flat=True)
    result_networks = {network: network in opened_networks for network in Network.Values}
    return JsonResponse(
        {"networks": result_networks},
        status=200,
    )
