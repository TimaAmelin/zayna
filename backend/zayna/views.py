import json
import logging

from django.http import HttpResponse

from .models import User

# logging.basicConfig(
#     format='%(asctime)s %(levelname)-8s %(message)s',
#     level=logging.INFO,
#     datefmt='%Y-%m-%d %H:%M:%S'
# )
logger = logging.getLogger(__name__)


def login_view(request):
    if request.method == "PUT":
        logger.info(f"[Zayna] Login {request} {request.body}")
        body = json.loads(request.body)
        id = body.get("id")
        username = body.get("username")
        user_qs = User.objects.filter(id=id)
        if user_qs.exists():
            logger.info(f"[Zayna] User {id} already exists")
            return HttpResponse(status=204)
        else:
            logger.info(f"[Zayna] Create user {id} with username {username}")
            User.objects.create(username=username, id=id)
            return HttpResponse(status=201)
    return HttpResponse(status=404)
