from datetime import datetime, timezone
from uuid import uuid4
from fastapi import APIRouter
from pydantic import BaseModel

# Configuración del router para ser montado en server.py
router = APIRouter(prefix="/api/reports", tags=["Reports"])

class GenericReportRequest(BaseModel):
    userId: str         # camelCase según docs/styling.md
    category: str
    description: str
    lat: float
    lng: float

class ValidateReportRequest(BaseModel):
    reportId: str       # camelCase
    validatorUserId: str # camelCase
    isValid: bool       # camelCase

@router.post("/genericReport")
def post_generic_report(payload: GenericReportRequest) -> dict:
    """
    Crea un nuevo reporte ciudadano (baches, luminarias, accidentes).
    TODO: Integrar con la persistencia en puebla_data.Json para que 
    los reportes aparezcan en el mapa de otros usuarios.
    """
    # Generamos un ID único para el reporte
    new_report_id = f"rep-{uuid4().hex[:8]}"
    
    return {
        "reportId": new_report_id,
        "status": "created",
        "userId": payload.userId,
        "category": payload.category,
        "location": {"lat": payload.lat, "lng": payload.lng},
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }

@router.post("/validateReport")
def post_validate_report(payload: ValidateReportRequest) -> dict:
    """
    Procesa la validación de un reporte existente.
    TODO: Implementar la lógica de '3 verificaciones' de AGENTCONTEXT.md.
    Cuando un bache llega a 3, se debe marcar como verificado en el mapa.
    """
    return {
        "reportId": payload.reportId,
        "validatedBy": payload.validatorUserId,
        "isValid": payload.isValid,
        "xpDelta": 5 if payload.isValid else 0, # Recompensa por auditar
    }