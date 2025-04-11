from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv


load_dotenv()

app = FastAPI()

class UserPrompt(BaseModel):
    prompt: str

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

@app.post("/chat")
def chat_with_ciphergenix(user_prompt: UserPrompt):
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
    }
    payload = {
        "contents": [
            {
                "parts": [{"text": f"You are CipherGenix, an AI security expert. {user_prompt.prompt}"}]
            }
        ]
    }

    response = requests.post(GEMINI_API_URL, headers=headers, json=payload)

    try:
        result = response.json()
        message = result["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        message = "CipherGenix encountered an error while generating your response."

    return {"ciphergenix_response": message}
