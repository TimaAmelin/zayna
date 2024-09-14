import os
from PIL import Image

def resize_and_center_image(input_path, output_path, canvas_size=(42, 42)):
    img = Image.open(input_path)
    img = img.convert("RGBA")

    # Calculate the dimensions
    width, height = img.size
    max_dimension = max(width, height)

    # Resize while maintaining aspect ratio
    if max_dimension > canvas_size[0]:
        scaling_factor = canvas_size[0] / float(max_dimension)
        new_size = (int(width * scaling_factor), int(height * scaling_factor))
        img = img.resize(new_size, Image.ANTIALIAS)

    # Create a new transparent canvas
    canvas = Image.new('RGBA', canvas_size, (0, 0, 0, 0))

    # Calculate position to center the image on the canvas
    pos_x = (canvas_size[0] - img.size[0]) // 2
    pos_y = (canvas_size[1] - img.size[1]) // 2

    # Paste the image onto the canvas
    canvas.paste(img, (pos_x, pos_y), img)

    canvas.save(output_path)

def process_directory(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename)

        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            continue

        resize_and_center_image(input_path, output_path, (42, 42))

if __name__ == '__main__':
    input_directory = 'media/logos'
    output_directory = 'media/logos_resized'

    process_directory(input_directory, output_directory)
