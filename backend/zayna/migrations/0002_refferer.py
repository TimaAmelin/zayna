# Generated by Django 5.1 on 2024-08-12 20:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zayna', '0001_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='referrer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='zayna.user'),
        ),
    ]