from datetime import datetime, timezone
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

app = FastAPI(
    title="Hackathon Backend API",
    version="0.1.0",
    description="Backend base para hackathons con FastAPI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EchoRequest(BaseModel):
    message: str


@app.get("/api/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "hackathon-backend",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/echo")
def echo(payload: EchoRequest) -> dict[str, str]:
    return {
        "echoed": payload.message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
