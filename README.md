# Hackathon Monorepo Template (React + Python)


## Estructura

```text
hackathonTemplate/
  backend/
  frontend/
  docs/
  render.yaml
```

## Inicio rapido local

1. Backend:
   - Entrar a `backend/`
   - Crear entorno virtual
   - Instalar dependencias
   - Levantar API
2. Frontend:
   - Entrar a `frontend/`
   - Instalar dependencias
   - Configurar URL de API
   - Levantar app

Pasos detallados en:
- `docs/REPO_SETUP_STEP_BY_STEP.md`
- `docs/CONNECTION_GUIDE.md`
- `docs/DEPLOY_RENDER.md`

## Instrucciones de uso (paso a paso)

### 1) Clonar repositorio

```bash
git clone <URL_DEL_REPO>
cd hackathonTemplate
```

### 2) Frontend (npm + React con TypeScript)

Este template ya viene configurado con React + TypeScript en `frontend/`.

```bash
cd frontend
npm install
npm run dev
```

Notas:
- `npm install` instala React, TypeScript y dependencias del bundler (Vite).
- Si necesitas build de produccion:

```bash
npm run build
```

### 3) Backend (Python + virtual environment)

Desde la raiz del repo:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Notas:
- Para salir del entorno virtual: `deactivate`
- Endpoint de prueba: `http://localhost:8000/api/health`

### 4) Probar integracion Front + Back

1. Levanta backend en puerto `8000`.
2. Levanta frontend en puerto `5173`.
3. Verifica que en `frontend/.env` tengas:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

4. En la UI pulsa "Probar conexion API".

## Objetivo de diseno

Este template deja una base minima pero funcional para que el equipo enfoque el hackathon en la idea del producto y no en setup inicial.
