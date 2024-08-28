# Use an official Python runtime as a parent image
FROM python:3.9-slim AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip3 install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]