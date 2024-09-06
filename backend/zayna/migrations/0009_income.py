# Generated by Django 4.2.13 on 2024-09-06 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("zayna", "0008_user_name"),
    ]

    operations = [
        migrations.RenameField(
            model_name="project",
            old_name="tokens_count",
            new_name="income",
        ),
        migrations.AlterField(
            model_name="project",
            name="price",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="user",
            name="name",
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]