import datetime

from django.db import models
from django.db.models import Sum
from django.utils import timezone

from .config import MAX_NANE_LENGTH, BOT_LINK


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=32, null=True, blank=True)
    referrer = models.ForeignKey("User", null=True, on_delete=models.SET_NULL)
    tokens_count = models.TextField(default="0")
    income = models.IntegerField(default=0)
    name = models.CharField(max_length=MAX_NANE_LENGTH, null=True, blank=True)
    friends = models.ManyToManyField("self", blank=True)
    income_updated_at = models.DateTimeField(default=timezone.now)
    daily_reward_at = models.DateTimeField(default=timezone.now)
    daily_combo = models.IntegerField(default=0)
    last_game_at = models.DateTimeField(default=None, null=True)
    last_game_won = models.BooleanField(default=False)
    photo = models.TextField(default=None, blank=False, null=True)

    def save(self, *args, **kwargs):
        if self.name is None:  # Only set name if it's not already provided
            self.name = self.username
        super(User, self).save(*args, **kwargs)

    @property
    def tokens_sum(self):
        current_tokens = int(self.tokens_count)
        last_hour_sum = self.batches.filter(
            created_at__gt=timezone.now() - datetime.timedelta(hours=1),
        ).aggregate(per_hour=Sum("tokens_count"))
        if last_hour_sum["per_hour"]:
            current_tokens += last_hour_sum["per_hour"]
        return current_tokens

    def add_income(self):
        if self.income_updated_at >= timezone.now() - datetime.timedelta(hours=1):
            return
        hours_without_update = (timezone.now() - self.income_updated_at) // datetime.timedelta(hours=1)
        self.tokens_count = str(int(self.tokens_count) + self.income * hours_without_update)
        self.income_updated_at = timezone.now()
        self.save(update_fields=["tokens_count", "income_updated_at"])


class TokensBatch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="batches")
    tokens_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True)


class Project(models.Model):
    class Modes(models.TextChoices):
        FOREST = "Forests", "Forests"
        TRANSPORT = "Transport", "Transport"
        ENERGY = "Energy", "Energy"
        WASTES = "Wastes", "Wastes"

    MODE_CHOICES = Modes

    name = models.CharField(default="", null=False, blank=True, max_length=255)
    price = models.IntegerField(default=0)
    income = models.IntegerField(default=0)
    payment = models.IntegerField(default=0)
    users = models.ManyToManyField(User, default=None, blank=True, related_name="projects")
    level = models.IntegerField(default=0)
    mode = models.CharField(max_length=10, choices=MODE_CHOICES.choices, default=Modes.FOREST, null=True)
    description = models.TextField(null=True, blank=True)
    logo = models.ImageField(blank=True, null=True)


class Present(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="presents")
    received = models.BooleanField(default=False)
    shown = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=False, related_name="presents")

    @property
    def link(self):
        return f"{BOT_LINK}?start=present{self.pk}"
