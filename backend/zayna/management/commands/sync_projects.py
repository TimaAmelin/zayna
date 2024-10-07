from django.core.management.base import BaseCommand

from ...models import *
import os
from django.conf import settings
from django.core.files import File


class Command(BaseCommand):
    help = (
        "This command adds all projects from file projects.txt."
    )

    def handle(self, *args, **kwargs) -> None:
        with open("projects.txt", "r") as file:
            for i, line in enumerate(file):
                line = line.strip()
                print("line", i)
                try:
                    number, id, mode, name, description, level, _, price, income, logo_path = line.split("\t")
                    print(mode, name, description, price, income, logo_path)
                    project, created = Project.objects.get_or_create(
                        name=name,
                        mode=mode,
                        description=description,
                        price=price,
                        income=income
                    )

                    if logo_path:
                        # Full path to the image
                        full_logo_path = os.path.join(settings.MEDIA_ROOT, 'logos', os.path.basename(logo_path))

                        logo_upload_path = os.path.join('logos', os.path.basename(logo_path))

                        print(full_logo_path)

                        with open(full_logo_path, 'rb') as f:
                            project.logo.save(os.path.basename(full_logo_path), File(f))
                        project.save()  # Save the project instance
                except Exception as e:
                    print(e)
