from django.db import models


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=32, null=True, blank=True)
    referrer = models.ForeignKey("User", null=True, on_delete=models.SET_NULL)
    tokens = models.TextField(default="0")


class TokensBatch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    tokens = models.IntegerField(default=0)
