from fastapi import FastAPI, Request
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class UserPrompt(BaseModel):
    prompt: str

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@app.post("/chat")
def chat_with_ciphergenix(user_prompt: UserPrompt):
    # Send prompt to OpenAI or other model
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "You are CipherGenix, an AI security expert."},
            {"role": "user", "content": user_prompt.prompt}
        ]
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
    result = response.json()
    message = result["choices"][0]["message"]["content"]
    return {"ciphergenix_response": message}
