Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.7-alpine

# Set the working directory
WORKDIR /app

# Adding buffering
ENV PYTHONUNBUFFERED 1

# Copy the current directory contents into the container
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Make port 8000 available for the app
EXPOSE 8000

# Run the command to start uWSGI
CMD ["python", "manage.py", "runserver", "127.0.0.1:8000"]
