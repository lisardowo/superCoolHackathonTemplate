# Setup Paso a Paso (Monorepo)

## 1) Clonar y abrir

1. Clona este repositorio.
2. Abre la carpeta raiz en VS Code.

## 2) Levantar backend (Python)

1. Entra a la carpeta backend.
2. Crea virtualenv:
   - Linux/macOS: `python3 -m venv .venv`
3. Activa virtualenv:
   - Linux/macOS: `source .venv/bin/activate`
4. Instala dependencias:
   - `pip install -r requirements.txt`
5. Copia variables de entorno:
   - `cp .env.example .env`
6. Inicia servidor:
   - `uvicorn app.main:app --reload --port 8000`

Verifica en navegador:
- `http://localhost:8000/api/health`
- `http://localhost:8000/docs`

## 3) Levantar frontend (React + TS)

1. Entra a la carpeta frontend.
2. Instala dependencias:
   - `npm install`
3. Copia variables de entorno:
   - `cp .env.example .env`
4. Ajusta `VITE_API_BASE_URL` para apuntar al backend local:
   - `VITE_API_BASE_URL=http://localhost:8000`
5. Ejecuta frontend:
   - `npm run dev`

Verifica en navegador:
- `http://localhost:5173`

## 4) Probar conexion front-back

1. Abre la app frontend.
2. Pulsa el boton de prueba de API.
3. Debes ver:
   - Respuesta de health check
   - Respuesta de endpoint echo

## 5) Donde editar la integracion API

Edita solo este archivo para extender llamadas:
- `frontend/src/lib/api.ts`

Ese archivo contiene:
- URL base
- Funciones de ejemplo
- Convenciones para agregar nuevos endpoints

## 6) Flujo recomendado de trabajo en hackathon

1. Define endpoints en backend (`backend/app/main.py` o routers).
2. Agrega funcion en `frontend/src/lib/api.ts`.
3. Consume esa funcion desde componentes React.
4. Prueba localmente.
5. Publica en Render.
