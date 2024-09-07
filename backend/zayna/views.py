import json

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


def friends_view(request):
    if request.method == "GET":
        logging.info(f"[Zayna] get friends list {request}")
        id = request.GET.get("id")
        return get_friends(id)

    return HttpResponse(status=404)


def tic_tac_toe_view(request):
    if request.method == "POST":
        logging.info(f"[Zayna] tic tac toe step {request}")
        body = json.loads(request.body)
        field = body.get("field")
        try:
            return next_step(field)
        except Exception as e:
            logging.warning(e)
            return HttpResponse(status=400)
    return HttpResponse(status=404)


def present_view(request):
    if request.method == "PUT":
        logging.info(f"[Zayna] present {request} {request.body}")
        body = json.loads(request.body)
        sender_id = body.get("sender_id")
        project_id = body.get("project_id")
        return add_present(sender_id, project_id)
    elif request.method == "GET":
        logging.info(f"[Zayna] get present {request} {request.body}")
        body = json.loads(request.body)
        present_id = body.get("present_id")
        user_id = body.get("user_id")
        return get_present(user_id, present_id)
    return HttpResponse(status=404)


def projects_view(request):
    if request.method == "GET":
        logging.info(f"[Zayna] get projects {request}")
        return get_projects(request)

    return HttpResponse(status=404)


def participate_view(request):
    if request.method == "POST":
        logging.info(f"[Zayna] participate {request}")
        body = json.loads(request.body)
        user_id = body.get("user_id")
        project_id = body.get("project_id")
        return participate(user_id, project_id)
    return HttpResponse(status=404)


def change_name_view(request):
    if request.method == "POST":
        logging.info(f"[Zayna] change name {request}")
        body = json.loads(request.body)
        id = body.get("id")
        name = body.get("name")
        try:
            return change_name(id, name)
        except Exception as e:
            logging.warning(e)
            return HttpResponse(status=400)

    return HttpResponse(status=404)


def delete_user_view(request, id):
    if request.method == "DELETE":
        logging.info(f"[Zayna] deleting user {id}")
        return delete_user(id)

    return HttpResponse(status=404)
