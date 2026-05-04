from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Allo Health AI Backend", version="1.0.0")

# ── CORS — allow React dev server and production domain ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
        "http://localhost:3000",
        "https://allo-health-ai.netlify.app",  # update with your domain
        "*"  # Remove in production and list exact origins
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama3-8b-8192"

SYSTEM_PROMPT = """You are Allo Health AI, a compassionate, professional, and non-judgmental AI health assistant specializing in sexual health, reproductive health, and general wellness.

Guidelines:
- Be warm, empathetic, and encouraging
- Provide medically accurate information in simple, clear language
- Always recommend consulting a qualified doctor for diagnosis or treatment
- Respect user privacy completely
- Avoid explicit content; keep responses clinical and helpful
- Format responses with bullet points when listing information
- Add a brief disclaimer at the end of medical advice responses"""


class Message(BaseModel):
    role: str   # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    user_name: str = "User"


class ChatResponse(BaseModel):
    reply: str
    model: str
    usage: dict = {}


@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "Allo Health AI Backend",
        "version": "1.0.0",
        "groq_configured": bool(GROQ_API_KEY)
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "groq_key_set": bool(GROQ_API_KEY)}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not GROQ_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY not configured on server. Please set it in your .env file."
        )

    # Build message history with system prompt
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in request.messages:
        messages.append({"role": msg.role, "content": msg.content})

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                GROQ_BASE_URL,
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 1024
                }
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Groq API error: {response.text}"
            )

        data = response.json()
        reply = data["choices"][0]["message"]["content"]
        usage = data.get("usage", {})

        return ChatResponse(reply=reply, model=GROQ_MODEL, usage=usage)

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Groq API request timed out.")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Failed to reach Groq API: {str(e)}")
