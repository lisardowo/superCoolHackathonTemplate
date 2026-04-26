from datetime import datetime, timezone

from pydantic import BaseModel


class PanicRequest(BaseModel):
	user_id: str
	lat: float
	lng: float
	note: str | None = None


class BrickPatchRequest(BaseModel):
	vehicle_id: str
	reason: str

def panic_button(payload: PanicRequest) -> dict:
	return {
		"status": "alert_sent",
		"user_id": payload.user_id,
		"location": {"lat": payload.lat, "lng": payload.lng},
		"sent_at": datetime.now(timezone.utc).isoformat(),
	}

def brick_vehicle(payload: BrickPatchRequest) -> dict:
	return {
		"status": "vehicle_bricked",
		"vehicle_id": payload.vehicle_id,
		"reason": payload.reason,
	}
