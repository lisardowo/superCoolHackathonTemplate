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

""""""

import hashlib
import secrets
import time

class DispositivoNFC:
    """Simula un teléfono o tarjeta con capacidad NFC"""
    def __init__(self, nombre, datos_sensibles):
        self.nombre = nombre
        self.__datos_reales = datos_sensibles # Información privada (PAN de la tarjeta)

    def responder_solicitud(self):
        # En NFC real, nunca se envía el dato real. Se envía un Token.
        # Generamos un 'nonce' (número aleatorio de un solo uso)
        nonce = secrets.token_hex(8)
        # Creamos un token dinámico usando SHA-256
        token = hashlib.sha256(f"{self.__datos_reales}{nonce}".encode()).hexdigest()
        return token[:16], nonce

class LectorTerminal:
    """Simula el punto de venta (POS) de una tienda"""
    def iniciar_lectura(self, dispositivo):
        print(f"[*] Buscando dispositivos en el rango de 4cm...")
        time.sleep(1.5) # Simula el tiempo de detección física
        
        print(f"[*] Conexión establecida con: {dispositivo.nombre}")
        
        # Paso 1: El lector solicita datos
        token, verificador = dispositivo.responder_solicitud()
        
        # Paso 2: Procesamiento
        print(f"[!] Recibido Token Dinámico: {token}")
        print(f"[!] Recibido Verificador (Nonce): {verificador}")
        
        # Simulación de validación bancaria
        print("[*] Validando con el banco... ¡Pago aprobado!")
        return True

# --- Ejecución de la simulación ---
mi_telefono = DispositivoNFC("iPhone de Diego", "4540-1111-2222-3333")
token, nonce = mi_telefono.responder_solicitud()
print(f"\nEl token es: {token}")

userToken = input("Introduce un token valido: ")
if userToken == token:
    terminal_oxxo = LectorTerminal()
    terminal_oxxo.iniciar_lectura(mi_telefono)
else: 
    print("Token inválido. No se puede procesar el pago.")

    