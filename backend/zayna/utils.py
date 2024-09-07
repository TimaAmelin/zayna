import random
from enum import Enum

from django.http import HttpResponse, JsonResponse
from django.conf import settings

from .tasks import *


def add_user(id, username, referrer_id):
    if id == referrer_id:
        logging.warning(f"User {id} tries to refer himself")
        return JsonResponse({"status": "ERROR", "message": "User can not refer himself"}, status=400)
    user_qs = User.objects.filter(id=id)
    referrer_qs = User.objects.filter(id=referrer_id)
    if user_qs.exists():
        logging.info(f"User {id} already exists")
        if not referrer_qs.exists():
            logging.info(f"Referrer {referrer_id} does not exist")
            return HttpResponse(status=204)
        if referrer_id:
            user_qs.first().friends.add(referrer_qs.first())
        return HttpResponse(status=204)
    else:
        if not referrer_qs.exists():
            logging.info(f"Referrer {referrer_id} does not exist")
            referrer_id = None
        logging.info(
            f"Create user {id} with username {username}" + (f" by referrer {referrer_id}" if referrer_id else "")
        )
        user = User.objects.create(username=username, id=id, referrer=referrer_qs.first())
        if referrer_id:
            user.friends.add(referrer_qs.first())
        return HttpResponse(status=201)


def add_tokens_batch(user_id, tokens_count):
    user_qs = User.objects.filter(id=user_id)
    if not user_qs.exists():
        logging.info(f"User {user_id} does not exist")
        return HttpResponse(status=400)
    TokensBatch.objects.create(user_id=user_qs.values_list("id", flat=True)[0], tokens_count=tokens_count)
    logging.info(f"TokensBatch object created (user_id={user_id}, tokens_count={tokens_count})")
    return HttpResponse(status=201)


def get_tokens_count(user_id):
    process_old_batches()  # TODO: remove it
    user_qs = User.objects.filter(id=user_id)
    if not user_qs.exists():
        logging.info(f"User {user_id} does not exist")
        return HttpResponse(status=400)
    current_tokens = int(user_qs.values_list("tokens_count", flat=True)[0])
    user = user_qs.first()
    last_hour_sum = user.batches.filter(
        created_at__gt=timezone.now() - datetime.timedelta(hours=1),
    ).aggregate(per_hour=Sum("tokens_count"))
    if last_hour_sum["per_hour"]:
        current_tokens += last_hour_sum["per_hour"]
    presents = list(user.presents.values_list("sender", "tokens_count"))
    return JsonResponse(
        {"sum": current_tokens, "presents": presents, "name": user.name, **last_hour_sum},
        status=200,
    )


class GameResult(str, Enum):
    PLAYER_WIN = "player_win"
    BOT_WIN = "bot_win"
    DRAW = "draw"


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


def next_step(field):
    status = check_win(field, PlayerValue.PLAYER)
    if isinstance(status, JsonResponse):
        return status

    free_cells = status
    bot_step = random.choice(free_cells)
    field[bot_step[0]][bot_step[1]] = PlayerValue.BOT

    status = check_win(field, PlayerValue.BOT)
    if isinstance(status, JsonResponse):
        return status
    return JsonResponse({"field": field}, status=202)


def add_present(sender_id, project_id):
    sender_qs = User.objects.filter(id=sender_id)
    if not sender_qs.exists():
        logging.info(f"User {sender_id} does not exist")
        return HttpResponse(status=400)
    sender = sender_qs.first()

    project_qs = Project.objects.filter(id=project_id)
    if not project_qs.exists():
        logging.info(f"Project {project_id} does not exist")
        return HttpResponse(status=400)
    project = project_qs.first()

    if sender.tokens_sum < project.price:
        logging.warning(f"Required {project.price}, current tokens: {sender.tokens_sum}")
        return HttpResponse("Not enough tokens", status=400)

    present = Present.objects.create(sender=sender, project=project)

    sender.tokens_count = str(int(sender.tokens_count) - project.price)
    sender.save(update_fields=["tokens_count"])
    return JsonResponse({"present": present.pk, "link": present.link}, status=201)


def get_present(user_id, present_id):
    user_qs = User.objects.filter(id=user_id)
    if not user_qs.exists():
        logging.info(f"User {user_id} does not exist")
        return HttpResponse(status=400)
    user = user_qs.first()

    present_qs = Present.objects.filter(id=present_id)
    if not present_qs.exists():
        logging.info(f"Present {present_id} does not exist")
        return HttpResponse(status=400)
    present = present_qs.first()

    if present.received:
        logging.info(f"Present {present_id} has been already received")
        return HttpResponse(status=400)

    present.received = True
    present.save(update_fields=["received"])
    user.income += present.project.income
    user.save(update_fields=["income"])
    return HttpResponse(status=200)


def get_projects(request):
    projects = list(Project.objects.values("id", "name", "price", "income", "level", "mode", "description", "logo"))
    for project in projects:
        if project["logo"]:  # Check if the logo field is not empty
            project['logo'] = request.build_absolute_uri(settings.MEDIA_URL + project['logo'])

    return JsonResponse({"projects": projects}, status=200)


def participate(user_id, project_id):
    user_qs = User.objects.filter(id=user_id)
    if not user_qs.exists():
        logging.info(f"User {user_id} does not exist")
        return HttpResponse(status=400)
    project_qs = Project.objects.filter(id=project_id)
    if not project_qs.exists():
        logging.info(f"Project {project_id} does not exist")
        return HttpResponse(status=400)
    user = user_qs.first()
    project = project_qs.first()
    if user.tokens_sum < project.price:
        logging.info(f"Not enough tokens: {user.tokens_sum} < {project.price}")
        return JsonResponse({"result": "ERROR", "message": "Not enough tokens"}, status=400)
    user.tokens_count = str(int(user.tokens_count) - project.price)
    user.income += project.income
    user.save(update_fields=["tokens_count", "income"])
    project.users.add(user)
    return HttpResponse(status=201)


def change_name(id, name):
    user_qs = User.objects.filter(id=id)
    if not user_qs.exists():
        logging.info(f"User {id} does not exist")
        return HttpResponse(status=400)
    if len(name) > MAX_NANE_LENGTH:
        logging.info(f"Name {name} is too long")
        return HttpResponse(status=400)
    user = user_qs.first()
    user.name = name
    user.save(update_fields=["name"])
    return HttpResponse(status=201)


def delete_user(id):
    user_qs = User.objects.filter(id=id)
    if not user_qs.exists():
        logging.info(f"User {id} does not exist")
        return HttpResponse(status=400)
    user_qs.delete()
    logging.info(f"User {id} deleted!")
    return HttpResponse(status=201)


def get_friends(id):
    user_qs = User.objects.filter(id=id)
    if not user_qs.exists():
        logging.info(f"User {id} does not exist")
        return HttpResponse(status=400)
    friends = list(user_qs.first().friends.values("id", "username"))
    return JsonResponse({"friends": friends}, status=200)