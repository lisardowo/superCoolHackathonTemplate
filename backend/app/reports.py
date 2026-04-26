from datetime import datetime, timezone
from uuid import uuid4
from fastapi import APIRouter
from pydantic import BaseModel
import json
import os
import ast

# 1. Definir el router que server.py espera
router = APIRouter(prefix="/api/reports", tags=["Reports"])

# 2. Rutas absolutas para evitar el FileNotFoundError
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
clientes_path = os.path.join(BASE_DIR, "Base_de_datos", "clientes.json")
reportes_path = os.path.join(BASE_DIR, "Base_de_datos", "reportes.json")

reportes_por_arista = {}

def cargar_reportes(reportes_por_arista):
    if not os.path.exists(reportes_path):
        return

    with open(reportes_path, "r", encoding="utf-8") as f:
        contenido = f.read()
        if not contenido.strip():
            return
        data = json.loads(contenido)

    for k, v in data.items():
        try:
            ((x1, y1), (x2, y2)) = ast.literal_eval(k)
            reportes_por_arista[((x1, y1), (x2, y2))] = v
        except Exception:
            continue  
    return reportes_por_arista

def guardar_reportes():
    # Guarda como "((lat1, lon1), (lat2, lon2))" para poder releer con ast.literal_eval
    data = {str(k): v for k, v in reportes_por_arista.items()}
    os.makedirs(os.path.dirname(reportes_path), exist_ok=True)
    with open(reportes_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def recibir_reporte(id, tipo, cord_x1, cord_y1, cord_x2, cord_y2):
    if ((cord_x1, cord_y1), (cord_x2, cord_y2)) not in reportes_por_arista:
        reportes_por_arista[((cord_x1, cord_y1), (cord_x2, cord_y2))] = {"positivos": 0, "negativos": 0}

    if tipo: reportes_por_arista[((cord_x1, cord_y1), (cord_x2, cord_y2))]["positivos"] += 1
    else: reportes_por_arista[((cord_x1, cord_y1), (cord_x2, cord_y2))]["negativos"] += 1

    guardar_reportes()  

    with open(clientes_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    if str(id) in data: data[str(id)]["creditos"] += 15

    with open(clientes_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

recibir_reporte(1, False, 19.046736, -98.216667, 19.048740, -98.216471) #Ejemplo de como se llama a la función para recibir un reporte (id, tipo, cord_x, cord_y)

class GenericReportRequest(BaseModel):
	user_id: str
	category: str
	description: str
	lat: float
	lng: float

class ValidateReportRequest(BaseModel):
	report_id: str
	validator_user_id: str
	is_valid: bool


def validate_report(payload: ValidateReportRequest) -> dict:
	return {
		"report_id": payload.report_id,
		"validated_by": payload.validator_user_id,
		"is_valid": payload.is_valid,
		"xp_delta": 5 if payload.is_valid else 0,
	}
 
@router.post("/generic")
def create_generic_report(payload: GenericReportRequest) -> dict:
    return {
        "report_id": f"rep-{uuid4().hex[:8]}",
        "status": "created",
        "user_id": payload.user_id,
        "location": {"lat": payload.lat, "lng": payload.lng},
        "created_at": datetime.now(timezone.utc).isoformat(),
    }