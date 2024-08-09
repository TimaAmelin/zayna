from django.contrib.auth.models import User
from django.http import HttpResponse


def login_view(request):
    if request.method == "POST":
        id = request.POST.get("id")
        username = request.POST.get("username")
        user_qs = User.objects.filter(id=id)
        if user_qs.exists():
            return HttpResponse(status=204)
        else:
            User.objects.create_user(username=username, id=id)
            return HttpResponse(status=201)
    return HttpResponse(status=404)
