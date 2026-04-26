# Backend (Python + FastAPI)

## Stack

- Python 3.11
- FastAPI
- Uvicorn

## Comandos

1. Crear entorno virtual:
   - `python3 -m venv .venv`
2. Activar entorno:
   - `source .venv/bin/activate`
3. Instalar dependencias:
   - `pip install -r requirements.txt`
4. Ejecutar API:
   - `uvicorn app.main:app --reload --port 8000`

## Endpoints base

- GET `/api/health`
- POST `/api/echo`

## Consideraciones para hackathon

- Mantener rutas bajo prefijo `/api`.
- Usar modelos Pydantic para validar payloads.
- Evitar loggear secretos en texto plano.
- Ajustar CORS con dominio exacto del frontend en produccion.

## Variables de entorno

- `FRONTEND_URL`: dominio permitido por CORS.

## Obtener Librerias actualmente en uso

pip freeze > requirements.txt

# Sistema de Navegación

En esta versión de la app, se dan manualmente los valores de las variables.

origen, destino, coords_ruta.

La salida de las coordenadas no son capaces de conectar con el front-end aún, y estas se guardan temporalmente en tuplas.

 # Clientes

La clase de clientes y Sistema estan sin ninguna forma de interactuar con el front, solo se añadio la funcion de las funciones. 
Hay que agregar como se comunica con el front.
