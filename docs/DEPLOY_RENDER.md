# Deploy en Render (Monorepo)

Este repositorio ya incluye `render.yaml` para crear ambos servicios:
- Backend (Web Service, Python)
- Frontend (Static Site, React build)

## 1) Preparar repo en GitHub

1. Crea un repositorio nuevo en GitHub.
2. Sube este template.
3. Verifica que `render.yaml` este en la raiz.

## 2) Crear servicios automaticamente (Blueprint)

1. Entra a Render.
2. New + > Blueprint.
3. Conecta tu repositorio.
4. Render detectara `render.yaml` y mostrara dos servicios.
5. Crea ambos.

## 3) Configurar URLs cruzadas

Cuando Render cree los servicios, ajusta variables:

1. En backend:
   - `FRONTEND_URL=https://<tu-frontend>.onrender.com`
2. En frontend:
   - `VITE_API_BASE_URL=https://<tu-backend>.onrender.com`

## 4) Redeploy

1. Guarda variables.
2. Lanza redeploy manual de ambos servicios.
3. Verifica salud backend en `/api/health`.
4. Abre frontend y prueba boton de conexion API.

## 5) Checklist de produccion

- CORS restringido al dominio frontend.
- Variables sensibles fuera de git.
- Logs limpios sin datos sensibles.
- Timeouts y retries en cliente HTTP si API es critica.

## 6) Solucion de problemas

- Error CORS:
  - Revisar `FRONTEND_URL` en backend.
- Front no llega al back:
  - Revisar `VITE_API_BASE_URL` y redeploy frontend.
- Build frontend falla:
  - Verificar lockfile y version de Node en Render.
- Backend no inicia:
  - Verificar `requirements.txt` y comando uvicorn.
