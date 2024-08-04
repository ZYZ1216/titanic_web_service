# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the frontend files into the container
COPY . /app/

# Expose port 8088
EXPOSE 8088

# Command to run the Python HTTP server
CMD ["python", "-m", "http.server", "8088"]