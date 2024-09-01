import random

from .models import *
import logging
from django.db.models import Sum
from django.http import HttpResponse, JsonResponse
import datetime
from django.utils import timezone
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
    last_hour_sum = user_qs.first().batches.filter(
        created_at__gt=timezone.now() - datetime.timedelta(hours=1),
    ).aggregate(per_hour=Sum("tokens_count"))
    if last_hour_sum["per_hour"]:
        current_tokens += last_hour_sum["per_hour"]
    return JsonResponse({"sum": current_tokens, **last_hour_sum}, status=200)


PLAYER_RESPONSE = JsonResponse({"result": GameResult.PLAYER_WIN}, 205)
BOT_RESPONSE = JsonResponse({"result": GameResult.BOT_WIN}, 205)


def next_step(field):
    free_cells = []
    for i in range(3):
        if field[i][0] == field[i][1] == field[i][2] == 1:
            return PLAYER_RESPONSE
        elif field[i][0] == field[i][1] == field[i][2] == -1:
            return BOT_RESPONSE
        elif field[0][i] == field[1][i] == field[2][i] == 1:
            return PLAYER_RESPONSE
        elif field[0][i] == field[1][i] == field[2][i] == -1:
            return BOT_RESPONSE
        for j in range(3):
            if field[i][j] == 0:
                free_cells.append((i, j))
    if not free_cells:
        return JsonResponse({"result": GameResult.DRAW}, 205)

    if field[0][0] == field[1][1] == field[2][2]:
        if field[0][0] == 1:
            return PLAYER_RESPONSE
        elif field[0][0] == -1:
            return BOT_RESPONSE
    elif field[0][2] == field[1][1] == field[2][0]:
        if field[1][1] == 1:
            return PLAYER_RESPONSE
        elif field[1][1] == -1:
            return BOT_RESPONSE

    bot_step = random.choice(free_cells)
    field[bot_step[0]][bot_step[1]] = -1
    return JsonResponse({"field": field}, 202)
