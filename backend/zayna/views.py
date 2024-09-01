import json
import logging

from django.http import HttpResponse

from .utils import *


def login_view(request):
    if request.method == "PUT":
        logging.info(f"[Zayna] Login {request} {request.body}")
        body = json.loads(request.body)
        id = body.get("id")
        username = body.get("username")
        referrer = body.get("from")
        return add_user(id, username, referrer)

    return HttpResponse(status=404)


def tokens_batch_view(request):
    if request.method == "PUT":
        logging.info(f"[Zayna] put tokens batch {request} {request.body}")
        body = json.loads(request.body)
        id = body.get("id")
        tokens_count = body.get("tokens_count")
        return add_tokens_batch(id, tokens_count)

    return HttpResponse(status=404)


def tokens_count_view(request):
    if request.method == "GET":
        logging.info(f"[Zayna] get tokens count {request}")
        id = request.GET.get("id")
        return get_tokens_count(id)

    return HttpResponse(status=404)


def tic_tac_toe_view(request):
    if request.method == "POST":
        body = json.loads(request.body)
        field = body.get("field")
        try:
            return next_step(field)
        except Exception as e:
            logging.warning(e)
            return HttpResponse(status=400)

    return HttpResponse(status=404)
