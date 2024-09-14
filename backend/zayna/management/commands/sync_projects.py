from django.core.management.base import BaseCommand

from ...models import *
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
import os
from django.conf import settings


def resize_image(image_path, size=(42, 42)):
    with Image.open(image_path) as img:
        img = img.convert("RGBA")

        # Calculate dimensions
        width, height = img.size
        max_dimension = max(width, height)

        # Resize with same aspect ratio
        if max_dimension > size[0]:
            scaling_factor = size[0] / float(max_dimension)
            new_size = (int(width * scaling_factor), int(height * scaling_factor))
            img = img.resize(new_size, Image.ANTIALIAS)

        # Create a new transparent canvas
        canvas = Image.new('RGBA', size, (0, 0, 0, 0))

        # Calculate position to center the image
        pos_x = (size[0] - img.size[0]) // 2
        pos_y = (size[1] - img.size[1]) // 2

        # Paste the image on the canvas
        canvas.paste(img, (pos_x, pos_y), img)

        # Save to bytes buffer
        buffer = BytesIO()
        canvas.save(buffer, format='PNG')
        return ContentFile(buffer.getvalue())


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

                        # Resize image and get ContentFile
                        logo_content = resize_image(full_logo_path)

                        # Save the image to the media/logos directory
                        project.logo.save(os.path.join('logos', os.path.basename(logo_path)), logo_content, save=True)
                except Exception as e:
                    print(e)
