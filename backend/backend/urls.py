"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from zayna.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", login_view, name="login"),
    path("login", login_view, name="login"),
    path("tokens_batch/", tokens_batch_view, name="tokens_batch"),
    path("tokens_count/", tokens_count_view, name="tokens_count"),
    path("tokens_count", tokens_count_view, name="tokens_count"),
    path("friends/", friends_view, name="friends"),
    path("friends", friends_view, name="friends"),
    path("daily/", daily_view, name="daily"),
    path("daily", daily_view, name="daily"),
    path("get_daily/", get_daily_view, name="daily"),
    path("get_daily", get_daily_view, name="daily"),
    path("tic_tac_toe/", tic_tac_toe_view, name="tic_tac_toe"),
    path("present/", present_view, name="present"),
    path("presents/", presents_view, name="present"),
    path("projects/<int:id>", user_projects_view, name="user_projects"),
    path("projects/<int:id>/", user_projects_view, name="user_projects"),
    path("participate/", participate_view, name="participate"),
    path("change_name/", change_name_view, name="change_name"),
    path("delete_user/<int:id>/", delete_user_view, name="delete_user"),
    path("stock/<int:id>", stock_view, name="stock"),
    path("stock/<int:id>/", stock_view, name="stock"),
    path("network/<int:id>/", network_view, name="network"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
