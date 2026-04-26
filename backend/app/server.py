import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importamos los routers de tus archivos locales (sin el prefijo 'app.')
# Asegúrate de que cada archivo tenga: router = APIRouter(...)
from hubs import router as hubs_router
from trip import router as trip_router
from user import router as user_router
from safety import router as safety_router
from reports import router as reports_router
from payments import router as payments_router
from map import router as map_router

app = FastAPI(title="Yankuilotl+ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Yankuilotl+ activo y dinámico"}

# Registro de rutas
app.include_router(hubs_router)
app.include_router(trip_router)
app.include_router(user_router)
app.include_router(safety_router)
app.include_router(reports_router)
app.include_router(payments_router)
app.include_router(map_router)

if __name__ == "__main__":
    # Importante: uvicorn busca el objeto "app" dentro del archivo "server"
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)