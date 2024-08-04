import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
import json
from backend.client_server_API import app

client = TestClient(app)

@patch("requests.get")
def test_read_root(mock_get):
    # Set up the mock response object with the necessary properties
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"Hello": "World"}
    mock_response.content = json.dumps({"Hello": "World"}).encode('utf-8')
    mock_response.headers = {'Content-Type': 'application/json'}  # Ensure the content type is set to application/json
    mock_get.return_value = mock_response

    # Perform the GET request
    response = client.get("/")

    # Assertions to check status code, content type, and body
    assert response.status_code == 200, "Expected a 200 OK response"
    assert response.headers['Content-Type'] == 'application/json', "Expected content type to be application/json"

# Test the calculation endpoint that makes another external GET request
@patch("requests.get")
def test_calculation(mock_get):
    model_id = 1
    SessionID = "SessionID"
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {"result": "success"}
    response = client.get(f"/calculation/{model_id}/{SessionID}?q=1")
    assert response.status_code == 200
    assert response.json() == {"result": "success"}

# Test the passenger endpoint that makes an external POST request
@patch("requests.post")
def test_update_item(mock_post):
    payload = {
        "id": "sessionID",
        "name": "Jane",
        "age": 22,
        "pclass": 1,
        "fare": 150.0,
        "sibsp": 0,
        "parch": 0,
        "origin": "C",
        "title": "Miss",
        "sex": "Female"
    }
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = payload
    response = client.post("/passenger", json=payload)
    assert response.status_code == 200
    assert response.json() == payload


@patch("requests.post")
def delete_session(mock_post):
    payload = {
        "id": "sessionID"
    }
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = payload
    response = client.post("/ending", json=payload)
    assert response.status_code == 200
    assert response.json() == payload