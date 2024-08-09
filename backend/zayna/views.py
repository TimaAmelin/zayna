import json

from .models import User
from django.http import HttpResponse


def login_view(request):
    if request.method == "PUT":
        body = json.loads(request.body)
        id = body.get("id")
        username = body.get("username")
        user_qs = User.objects.filter(id=id)
        if user_qs.exists():
            return HttpResponse(status=204)
        else:
            User.objects.create(username=username, id=id)
            return HttpResponse(status=201)
    return HttpResponse(status=404)
