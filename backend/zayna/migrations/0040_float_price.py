# Generated by Django 4.2.13 on 2024-10-24 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("zayna", "0039_char_logo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="income",
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name="project",
            name="price",
            field=models.FloatField(default=0),
        ),
    ]
