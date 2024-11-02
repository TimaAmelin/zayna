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
        photo = body.get("photo")
        return add_user(id, username, referrer, photo)

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


def daily_view(request):
    if request.method == "GET":
        logging.info(f"[Zayna] check daily reward {request}")
        id = request.GET.get("id")
        return check_daily_reward(id)

    return HttpResponse(status=404)


def get_daily_view(request):
    if request.method == "GET":
        logging.info(f"[Zayna] get daily reward {request}")
        id = request.GET.get("id")
        return get_daily_reward(id)

    return HttpResponse(status=404)


def tic_tac_toe_view(request):
    if request.method == "POST":
        logging.info(f"[Zayna] tic tac toe step {request}")
        body = json.loads(request.body)
        field = body.get("field")
        id = body.get("id")
        check = check_tic_tac_toe(id)
        if isinstance(check, JsonResponse):
            return check
        return next_step(id, field)
    return HttpResponse(status=404)


def present_view(request):
    if request.method == "PUT":
        logging.info(f"[Zayna] present {request} {request.body}")
        body = json.loads(request.body)
        sender_id = body.get("sender_id")
        project_id = body.get("project_id")
        receiver_id = body.get("receiver_id")
        return add_present(sender_id, project_id, receiver_id)
    elif request.method == "POST":
        logging.info(f"[Zayna] get present {request} {request.body}")
        body = json.loads(request.body)
        present_id = body.get("present_id")
        user_id = body.get("user_id")
        return get_present(user_id, present_id)
    return HttpResponse(status=404)


def presents_view(request):
    if request.method == "GET":
        logging.info(f"[Zayna] get presents {request}")
        return get_presents(request)

    return HttpResponse(status=404)


def user_projects_view(request, id):
    if request.method == "GET":
        logging.info(f"[Zayna] get user {id} projects {request}")
        return get_user_projects(request, id)

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


def stock_view(request, id):
    if request.method == "GET":
        logging.info(f"[Zayna] getting stock for user {id}")
        return get_stock(id)
    elif request.method == "POST":
        logging.info(f"[Zayna] setting stock for user {id}")
        body = json.loads(request.body)
        stock = body.get("stock")
        return set_stock(id, stock)

    return HttpResponse(status=404)


def network_view(request, id):
    if request.method == "GET":
        logging.info(f"[Zayna] getting networks for user {id}")
        return get_networks(id)
    elif request.method == "POST":
        logging.info(f"[Zayna] selecting network for user {id}")
        body = json.loads(request.body)
        network = body.get("network")
        return add_network(id, network)

    return HttpResponse(status=404)
