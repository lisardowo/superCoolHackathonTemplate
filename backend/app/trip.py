from fastapi import APIRouter
from pydantic import BaseModel
from uuid import uuid4
from datetime import datetime, timezone

router = APIRouter(prefix="/api/trip", tags=["Trip"])

class TripStartRequest(BaseModel):
    user_id: str
    vehicle_id: str
    start_lat: float
    start_lng: float

@router.get("/route-sana")
def get_route(origin_lat: float, origin_lng: float, dest_lat: float, dest_lng: float):
    # Aquí es donde entraría tu lógica de NetworkX
    return {
        "route_points": [{"lat": origin_lat, "lng": origin_lng}, {"lat": dest_lat, "lng": dest_lng}],
        "sanitized": True
    }

@router.post("/start")
def post_start_trip(payload: TripStartRequest):
    return {
        "trip_id": f"trip-{uuid4().hex[:10]}",
        "status": "active",
        "started_at": datetime.now(timezone.utc).isoformat()
    }