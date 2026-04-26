from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timezone

router = APIRouter(prefix="/api/user", tags=["User"])

class LinkRutaRequest(BaseModel):
    user_id: str
    card_last4: str

class UserSettingsPatch(BaseModel):
    user_id: str
    notifications_enabled: bool | None = None
    dark_mode: bool | None = None

@router.get("/profile")
def get_profile(user_id: str = "demo-user"):
    # TODO: Buscar user_id en puebla_data.Json
    return {
        "user_id": user_id,
        "display_name": "Poblanit@_26",
        "xp": 1280,
        "tier": "talavera",
        "updated_at": datetime.now(timezone.utc).isoformat()
    }

@router.post("/link-ruta")
def post_link_ruta(payload: LinkRutaRequest):
    return {"status": "linked", "user_id": payload.user_id, "message": "Tarjeta vinculada"}

@router.patch("/settings")
def patch_settings(payload: UserSettingsPatch):
    return {"status": "updated", "settings": payload.model_dump(exclude_none=True)}