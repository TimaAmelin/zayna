# Generated by Django 4.2.13 on 2024-09-12 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("zayna", "0025_null_project"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="payment",
            field=models.IntegerField(default=0),
        ),
    ]