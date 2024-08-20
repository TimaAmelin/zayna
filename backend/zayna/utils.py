from .models import *
import logging
from django.db.models import Sum
from django.http import HttpResponse


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
    user_qs = User.objects.filter(id=user_id)
    if not user_qs.exists():
        logging.info(f"User {user_id} does not exist")
        return HttpResponse(status=400)
    current_tokens = int(user_qs.values_list("tokens_count", flat=True)[0])
    last_hour_sum = user_qs.first().batches.aggregate(Sum("tokens_count"))
    return HttpResponse(status=200, content={"sum": current_tokens, "per_hour": last_hour_sum})

