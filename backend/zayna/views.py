import json
import logging

from django.http import HttpResponse

from .models import User


def login_view(request):
    if request.method == "PUT":
        logging.info(f"[Zayna] Login {request} {request.body}")
        body = json.loads(request.body)
        id = body.get("id")
        username = body.get("username")
        user_qs = User.objects.filter(id=id)
        if user_qs.exists():
            logging.info(f"[Zayna] User {id} already exists")
            return HttpResponse(status=204)
        else:
            logging.info(f"[Zayna] Create user {id} with username {username}")
            User.objects.create(username=username, id=id)
            return HttpResponse(status=201)
    return HttpResponse(status=404)
