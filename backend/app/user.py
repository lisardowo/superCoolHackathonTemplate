from datetime import datetime, timezone
from pydantic import BaseModel

class LinkRutaRequest(BaseModel):
	user_id: str
	card_last4: str

class UserSettingsPatch(BaseModel):
	user_id: str
	notifications_enabled: bool | None = None
	dark_mode: bool | None = None
	language: str | None = None



def get_profile(user_id: str = "demo-user") -> dict:
	return {
		"user_id": user_id,
		"display_name": "Poblanit@_26",
		"xp": 1280,
		"coins": 426,
		"tier": "talavera",
		"updated_at": datetime.now(timezone.utc).isoformat(),
	}

def link_ruta_card(payload: LinkRutaRequest) -> dict:
	return {
		"status": "linked",
		"user_id": payload.user_id,
		"card_last4": payload.card_last4,
		"message": "Tarjeta RUTA vinculada (draft)",
	}

def patch_user_settings(payload: UserSettingsPatch) -> dict:
	return {
		"status": "updated",
		"user_id": payload.user_id,
		"settings": payload.model_dump(exclude_none=True),
	}
