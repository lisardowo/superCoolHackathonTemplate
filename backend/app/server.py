
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post()
def health():
    return {"status": "ok"}
@app.post()
@app.post()
@app.post()
@app.post()
@app.post()
GET /api/health
GET /api/user/profile

GET /api/map/nearby

GET /api/trip/route-sana

GET /api/hubs/status: Consulta la disponibilidad de baterías cargadas en un Hub específico.

GET /api/payments/balance

POST /api/trip/start

POST /api/trip/end

POST /api/hubs/swap
POST /api/reports/incident

POST /api/reports/validate

POST /api/user/link-ruta

POST /api/safety/panic

POST /api/payments/hybrid-calc
POST /api/assistance/request


PATCH /api/user/settings

PATCH /api/safety/brick
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)