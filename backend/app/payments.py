from fastapi import APIRouter
from pydantic import BaseModel


class HybridCalcRequest(BaseModel):
    user_id: str
    trip_cost: float
    wallet_balance: float
    ruta_discount_pct: float = 0.0



def get_balance(user_id: str = "demo-user") -> dict:
    return {
        "user_id": user_id,
        "wallet_balance": 220.5,
        "currency": "MXN",
    }



def hybrid_calc(payload: HybridCalcRequest) -> dict:
    discounted = max(payload.trip_cost * (1 - payload.ruta_discount_pct / 100), 0)
    wallet_used = min(payload.wallet_balance, discounted)
    card_charge = round(discounted - wallet_used, 2)
    return {
        "user_id": payload.user_id,
        "trip_cost": payload.trip_cost,
        "discounted_cost": round(discounted, 2),
        "wallet_used": round(wallet_used, 2),
        "card_charge": card_charge,
    }