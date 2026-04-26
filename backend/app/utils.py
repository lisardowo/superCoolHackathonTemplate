from fastapi import APIRouter, Query
from utils import get_all_hubs # Importamos la utilidad

router = APIRouter(prefix="/api/map", tags=["Map"])

@router.get("/nearby")
def get_nearby(
    lat: float = Query(..., description="Latitud actual del usuario"),
    lng: float = Query(..., description="Longitud actual del usuario"),
    radius: float = 0.02 # Radio aproximado en grados para el MVP
):
    all_hubs = get_all_hubs()
    
    # Filtro dinámico: Solo hubs cerca de la ubicación del Front-end
    nearby_hubs = [
        h for h in all_hubs 
        if abs(h["lat"] - lat) < radius and abs(h["lng"] - lng) < radius
    ]
    
    return {
        "userLocation": {"lat": lat, "lng": lng},
        "hubs": nearby_hubs,
        "totalFound": len(nearby_hubs)
    }