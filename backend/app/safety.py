from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone

router = APIRouter(prefix="/api/safety", tags=["Safety"])

class PanicRequest(BaseModel):
    user_id: str
    lat: float
    lng: float

class BrickPatchRequest(BaseModel):
    vehicle_id: str
    reason: str

@router.post("/panic")
def post_panic(payload: PanicRequest):
    return {"status": "alert_sent", "sent_at": datetime.now(timezone.utc).isoformat()}

@router.patch("/brick")
def patch_brick(payload: BrickPatchRequest):
    return {"status": "vehicle_bricked", "vehicle_id": payload.vehicle_id}