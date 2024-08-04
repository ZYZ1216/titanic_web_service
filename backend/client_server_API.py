import os
from fastapi import FastAPI, Request, HTTPException
from fastapi import APIRouter
import logging
import requests


from starlette.middleware.cors import CORSMiddleware

router = APIRouter()
app = FastAPI()

logging.basicConfig(level=logging.INFO)

# Use environment variables with fallbacks
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:8088')
MODEL_SERVICE_URL = os.getenv('MODEL_SERVICE_URL', 'http://localhost:8086')
# FRONTEND_URL = "http://localhost:8088"
# MODEL_SERVICE_URL = "http://localhost:8086"

origins = [FRONTEND_URL, "http://localhost:8086", "http://127.0.0.1:8088", MODEL_SERVICE_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"Request path: {request.url.path}")
    response = await call_next(request)
    logging.info(f"Response status: {response.status_code}")
    return response

@app.get("/")
def read_root():
    url = f"{MODEL_SERVICE_URL}"
    params = ""
    response = requests.get(url=url, params=params)
    print(response.content, "\n", response)
    print(response.status_code, "\n", response.text, "\n", type(response.content))
    return response.content

@app.get("/calculation/{model}/{ID}")
async def read_item(model: int = 0, ID: str = "", q: int = 1):
    url = f"{MODEL_SERVICE_URL}/calculation/{model}/{ID}"
    params = {"q": q}
    response = requests.get(url=url, params=params)
    return response.json()

@app.post("/passenger")
async def update_item(request: Request):
    try:
        data = await request.json()
        url = f'{MODEL_SERVICE_URL}/passenger'
        response = requests.post(url=url, json=data)
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ending")
async def update_item(request: Request):
    try:
        data = await request.json()
        url = f'{MODEL_SERVICE_URL}/ending'
        response = requests.post(url=url, json=data)
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))