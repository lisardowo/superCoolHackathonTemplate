from datetime import datetime, timezone
from uuid import uuid4

from pydantic import BaseModel

class TripStartRequest(BaseModel):
	user_id: str
	vehicle_id: str
	start_lat: float
	start_lng: float


class TripEndRequest(BaseModel):
	trip_id: str
	end_lat: float
	end_lng: float
	duration_min: int | None = None


def get_route_sanitized(origin_lat: float, origin_lng: float, dest_lat: float, dest_lng: float) -> dict:
	return {
		"origin": {"lat": origin_lat, "lng": origin_lng},
		"destination": {"lat": dest_lat, "lng": dest_lng},
		"route_points": [
			{"lat": origin_lat, "lng": origin_lng},
			{"lat": (origin_lat + dest_lat) / 2, "lng": (origin_lng + dest_lng) / 2},
			{"lat": dest_lat, "lng": dest_lng},
		],
		"sanitized": True,
	}


def start_trip(payload: TripStartRequest) -> dict:
	return {
		"trip_id": f"trip-{uuid4().hex[:10]}",
		"status": "active",
		"user_id": payload.user_id,
		"vehicle_id": payload.vehicle_id,
		"started_at": datetime.now(timezone.utc).isoformat(),
	}


def end_trip(payload: TripEndRequest) -> dict:
	return {
		"trip_id": payload.trip_id,
		"status": "finished",
		"ended_at": datetime.now(timezone.utc).isoformat(),
		"summary": {
			"duration_min": payload.duration_min or 18,
			"coins_earned": 10,
			"xp_earned": 50,
		},
	}
