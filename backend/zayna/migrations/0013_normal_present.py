# Generated by Django 4.2.13 on 2024-09-07 12:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("zayna", "0012_friends"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="present",
            name="tokens_count",
        ),
        migrations.AddField(
            model_name="present",
            name="project",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="presents",
                to="zayna.project",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="present",
            name="received",
            field=models.BooleanField(default=False),
        ),
    ]
