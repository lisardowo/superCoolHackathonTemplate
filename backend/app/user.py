from datetime import datetime, timezone
from pydantic import BaseModel
import json
import os

class Clientes():
    def __init__(self, nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta, creditos = 0):
        self.nombre = nombre
        self.correo_electronico = correo_electronico
        self.edad = edad
        self.Tarjeta = Tarjeta
        self.Tarjeta_ruta = Tarjeta_ruta
        self.creditos = creditos
		
class Sistema():
    def __init__(self):
        self.clientes = {}
        self.path = "backend/app/base_de_datos/clientes.json"
        self.cargar()
        self.id = max(self.clientes.keys(), default=0) + 1

    def agregar_cliente(self, nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta):
        self.clientes[self.id] = Clientes(nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta)
        self.guardar()
        self.id += 1

    def guardar(self):
        os.makedirs(os.path.dirname(self.path), exist_ok=True)
        data = {
            id: vars(cliente)
            for id, cliente in self.clientes.items()
        }
        with open(self.path, "w") as f:
            json.dump(data, f, indent=4)

    def cargar(self):
        if not os.path.exists(self.path):
            return
        with open(self.path, "r") as f:
            contenido = f.read()
            if not contenido.strip():
                return
            data = json.loads(contenido)
        self.clientes = {
            int(id): Clientes(**attrs)
            for id, attrs in data.items()
        }

sis = Sistema()
sis.agregar_cliente("Poblanit@_26", "poblanit_26@example.com", 25, "1234", "RUTA-1234")

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
