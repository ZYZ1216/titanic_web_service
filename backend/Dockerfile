# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app/

# Expose port 8087 to the outside world
EXPOSE 8087

# Command to run the FastAPI application using Uvicorn
CMD ["uvicorn", "client_server_API:app", "--host", "0.0.0.0", "--port", "8087"]