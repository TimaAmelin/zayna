# Generated by Django 4.2.13 on 2024-08-09 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("username", models.CharField(blank=True, max_length=32, null=True)),
            ],
        ),
    ]
