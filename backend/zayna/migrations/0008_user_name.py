# Generated by Django 4.2.13 on 2024-09-06 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("zayna", "0007_project"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="name",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
