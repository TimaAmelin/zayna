import datetime
from email.policy import default
import logging
from django.db import models
from django.db.models import Sum
from django.utils import timezone

from .config import MAX_NANE_LENGTH, BOT_LINK


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=32, null=True, blank=True)
    referrer = models.ForeignKey("User", null=True, on_delete=models.SET_NULL)
    tokens_count = models.TextField(default="0")
    income = models.IntegerField(default=0)
    name = models.CharField(max_length=MAX_NANE_LENGTH, null=True, blank=True)
    friends = models.ManyToManyField("self", blank=True)
    daily_reward_at = models.DateTimeField(null=True, default=None)
    daily_combo = models.IntegerField(default=0)
    last_game_at = models.DateTimeField(default=None, null=True)
    last_game_won = models.BooleanField(default=False)
    photo = models.TextField(default=None, blank=False, null=True)
    stock = models.CharField(null=True, default=None, blank=True, max_length=255)
    updated_at = models.DateTimeField(auto_now=True)

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
        logging.info(f"Adding income for user {self.id}")
        income_updated_at = self.updated_at
        logging.info(f"income_updated_at: {income_updated_at}")
        if income_updated_at >= timezone.now() - datetime.timedelta(minutes=1):
            return
        hours_without_update = (timezone.now() - income_updated_at) / datetime.timedelta(hours=1)
        logging.info(f"hours_without_update: {hours_without_update}")
        hours_without_update = min(3, hours_without_update)
        logging.info(f"new hours_without_update: {hours_without_update}")
        self.tokens_count = str(round(int(self.tokens_count) + self.income * hours_without_update))
        logging.info(f"Add tokens: {self.income * hours_without_update}")
        self.save(update_fields=["tokens_count", "updated_at"])

    def process_old_batches(self):
        logging.info(f"Aggregating olg batches for user {self.id}...")
        old_batches_sum = self.batches.aggregate(sum=Sum("tokens_count"))
        if not old_batches_sum["sum"]:
            logging.info("No batches found")
            return
        self.tokens_count = str(int(self.tokens_count) + old_batches_sum["sum"])
        self.save(update_fields=["tokens_count", "updated_at"])
        logging.info("Deleting olg batches...")
        deleted, _ = self.batches.all().delete()
        logging.info(f"{deleted} batches deleted")


class TokensBatch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="batches")
    tokens_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True)


class Project(models.Model):
    class Modes(models.TextChoices):
        MARKET = "Рынок", "Рынок"
        REALTY = "Недвижимость", "Недвижимость"
        ENERGY = "Энергия", "Энергия"
        WASTES = "Затраты", "Затраты"

    MODE_CHOICES = Modes

    name = models.CharField(default="", null=False, blank=True, max_length=255)
    price_by_level = models.JSONField(default=list)
    income_by_level = models.JSONField(default=list)
    payment = models.IntegerField(default=0)
    mode = models.CharField(max_length=12, choices=MODE_CHOICES.choices, default=Modes.MARKET, null=True)
    description = models.TextField(null=True, blank=True)
    logo = models.CharField(default="", null=False, blank=True, max_length=255)
    is_present = models.BooleanField(default=False, null=False)

    def cost(self, level):
        if len(self.price_by_level) > level:
            return self.price_by_level[level]
        return 1e10

    def profit(self, level):
        if len(self.income_by_level) > level:
            return self.income_by_level[level]
        return 1e10


class UserProject(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="participates")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=False)
    level = models.IntegerField(default=0)


class Present(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="presents")
    received = models.BooleanField(default=False)
    shown = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=False, related_name="presents")

    @property
    def link(self):
        return f"{BOT_LINK}?start=present{self.pk}"


class Network(models.Model):
    class Values(models.TextChoices):
        YOUTUBE = "YouTube", "YouTube"
        X = "X", "X"
        FB = "FB", "FB"
        INSTA = "Insta", "Insta"
        LINKEDIN = "LinkedIn", "LinkedIn"
        TG = "TG", "TG"
        TIKTOK = "TikTok", "TikTok"
        PINTEREST = "Pinterst", "Pinterst"

    NETWORK_CHOICES = Values

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="networks")
    name = models.CharField(max_length=10, choices=NETWORK_CHOICES.choices, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
