from celery import shared_task
from .models import *
import datetime
import logging
from django.db.models import Sum
from django.utils import timezone


@shared_task
def process_old_batches():
    logging.info("Aggregating olg batches...")
    to_update = []
    for user in User.objects.filter(batches__isnull=False).all():
        old_batches_sum = user.batches.filter(
            created_at__lte=timezone.now() - datetime.timedelta(hours=1),
        ).aggregate(per_hour=Sum("tokens_count"))
        if old_batches_sum["per_hour"]:
            user.tokens_count = str(int(user.tokens_count) + old_batches_sum["per_hour"])
            to_update.append(user)
    logging.info(f"Updating tokens for users {', '.join((user.username for user in to_update))}")
    updated = User.objects.bulk_update(to_update, ["tokens_count"])
    logging.info(f"Updated {updated} users")
    logging.info("Deleting olg batches...")
    deleted, _ = TokensBatch.objects.filter(
        created_at__lt=timezone.now() - datetime.timedelta(hours=1),
    ).delete()
    logging.info(f"{deleted} batches deleted")
