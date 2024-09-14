from django.core.management.base import BaseCommand

from ...models import *


class Command(BaseCommand):
    help = (
        "This command adds all projects from file projects.txt."
    )

    def handle(self, *args, **kwargs) -> None:
        with open("projects.txt", "r") as file:
            for i, line in enumerate(file):
                print("line", i)
                try:
                    number, id, mode, name, description, level, _, price, income = line.split("\t")
                    print(mode, name, description, price, income)
                    Project.objects.get_or_create(
                        name=name,
                        mode=mode,
                        description=description,
                        price=price,
                        income=income,
                    )
                except Exception as e:
                    print(e)
