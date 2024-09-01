from datetime import timezone
from enum import Enum
from django.db import models


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=32, null=True, blank=True)
    referrer = models.ForeignKey("User", null=True, on_delete=models.SET_NULL)
    tokens_count = models.TextField(default="0")


class TokensBatch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="batches")
    tokens_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True)
