from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/payments", tags=["Payments"])

class HybridCalcRequest(BaseModel):
    user_id: str
    trip_cost: float
    wallet_balance: float

@router.get("/balance")
def get_user_balance(user_id: str = "demo-user"):
    return {"user_id": user_id, "wallet_balance": 220.5}

@router.post("/hybrid-calc")
def post_hybrid_calc(payload: HybridCalcRequest):
    # Lógica de descuento real
    return {"card_charge": round(payload.trip_cost - payload.wallet_balance, 2)}