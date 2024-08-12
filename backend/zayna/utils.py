from .models import *
import logging

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
