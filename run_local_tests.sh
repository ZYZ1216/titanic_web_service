#!/bin/bash

# Start backend service
cd backend
uvicorn client_server_API:app --host 0.0.0.0 --port 8087 &
BACKEND_PID=$!

# Start frontend service
cd ../frontend
python3 -m http.server 8088 &
FRONTEND_PID=$!

# Clone and start model service
cd ..
if [ ! -d "model_service" ]; then
    git clone https://mygit.th-deg.de/ainb_24_the_iceberg/titanic_model_service.git model_service
fi
cd model_service
uvicorn main:app --host 0.0.0.0 --port 8086 &
MODEL_PID=$!

# Wait for services to start
echo "Waiting for services to start..."
sleep 90

# Run Cypress tests
cd ../end2endtestCY
npm ci
npx cypress run

# Clean up
kill $BACKEND_PID
kill $FRONTEND_PID
kill $MODEL_PID

# Return to the root directory
cd ..
