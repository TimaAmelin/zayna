from django.core.management.base import BaseCommand

from ...models import *


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
                        logo=logo_path,
                    )
                    print("created", created)
                    project.price_by_level.append(round(float(price)))
                    project.income_by_level.append(round(float(price)))
                    project.save(update_fields=["price_by_level", "income_by_level"])
                except Exception as e:
                    print(e)
