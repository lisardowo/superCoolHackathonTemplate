
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/hubs", tags=["Hubs"])

class SwapBatteryRequest(BaseModel):
    hub_id: str
    user_id: str
    swapped_count: int = 1

@router.get("/batteryStatus")
def get_status():
    return {"hubs": [{"hub_id": "hub-zocalo", "available": 12}]}

@router.post("/batterySwap")
def post_swap(payload: SwapBatteryRequest):
    return {"status": "recorded", "bonus_coins": payload.swapped_count * 2}