import json

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
