import random
from enum import Enum

from django.http import HttpResponse, JsonResponse

from .tasks import *


def add_user(id, username, referrer):
    user_qs = User.objects.filter(id=id)
    referrer_qs = User.objects.filter(id=referrer)
    if user_qs.exists():
        logging.info(f"User {id} already exists")
        return HttpResponse(status=204)
    else:
        if not referrer_qs.exists():
            logging.info(f"Referrer {referrer} does not exist")
            referrer = None
        logging.info(
            f"Create user {id} with username {username}" + (f" by referrer {referrer}" if referrer else "")
        )
        User.objects.create(username=username, id=id, referrer=referrer_qs.first())
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


def add_present(sender_id, receiver_id, tokens_count):
    if sender_id == receiver_id:
        logging.info(f"Users {sender_id} and {receiver_id} are the same.")
        return HttpResponse(status=400)
    sender_qs = User.objects.filter(id=sender_id)
    if not sender_qs.exists():
        logging.info(f"User {sender_id} does not exist")
        return HttpResponse(status=400)
    sender = sender_qs.first()
    receiver_qs = User.objects.filter(id=receiver_id)
    if not receiver_qs.exists():
        logging.info(f"User {receiver_id} does not exist")
        return HttpResponse(status=400)
    receiver = receiver_qs.first()
    batches_sum = sender.batches.aggregate(per_hour=Sum("tokens_count"))
    current_tokens = int(sender.tokens_count) + (batches_sum["per_hour"] or 0)
    if tokens_count < 0 or current_tokens < tokens_count:
        logging.warning(f"Required {tokens_count}, current tokens: {current_tokens}")
        return HttpResponse("Not enough tokens", status=400)
    Present.objects.create(sender=sender, receiver=receiver, tokens_count=tokens_count)
    sender.tokens_count = str(current_tokens - tokens_count)
    sender.save(update_fields=["tokens_count"])
    receiver.tokens_count = str(int(receiver.tokens_count) + tokens_count)
    receiver.save(update_fields=["tokens_count"])
    return HttpResponse(status=200)


def get_projects():
    projects = list(Project.objects.values("id", "name", "price", "income"))
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
    friends = list(user_qs.first().friends.values_list("username", flat=True))
    return JsonResponse({"friends": friends}, status=200)