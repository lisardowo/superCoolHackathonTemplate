from pydantic import BaseModel

class SwapBatteryRequest(BaseModel):
	hub_id: str
	user_id: str
	swapped_count: int = 1



def get_hubs_battery_status() -> dict:
	return {
		"hubs": [
			{"hub_id": "hub-zocalo", "available": 12, "empty_slots": 4},
			{"hub_id": "hub-angelopolis", "available": 7, "empty_slots": 9},
		]
	}

def post_swapped_batteries(payload: SwapBatteryRequest) -> dict:
	return {
		"status": "recorded",
		"hub_id": payload.hub_id,
		"user_id": payload.user_id,
		"swapped_count": payload.swapped_count,
		"bonus_coins": payload.swapped_count * 2,
	}
