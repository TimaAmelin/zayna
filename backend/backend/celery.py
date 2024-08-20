import os

from celery import Celery
from celery import schedules


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('your_project')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'schedule-process-old-batches': {
        'task': 'zayna.tasks.process_old_batches',
        'schedule': schedules.crontab(minute=0),
    },
}
