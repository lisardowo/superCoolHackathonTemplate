# Guia de Conexion API (Frontend <-> Backend)

## Objetivo

Centralizar toda la conexion HTTP en un unico archivo del frontend:
- `frontend/src/lib/api.ts`

Asi el equipo modifica un solo punto cuando agrega o cambia endpoints.

## Contrato base usado en este template

- GET `/api/health`
  - Devuelve estado de API
- POST `/api/echo`
  - Recibe `{ message: string }`
  - Devuelve payload con timestamp

## Pasos para agregar un endpoint nuevo

1. Crear endpoint en backend:
   - Ruta sugerida: `/api/<recurso>`
2. Definir tipos TypeScript en `frontend/src/lib/api.ts`.
3. Crear funcion API en ese mismo archivo.
4. Llamar funcion desde componente React.
5. Validar local y luego en entorno Render.

## Recomendaciones clave

- Mantener prefijo `/api` en backend.
- Manejar errores HTTP en wrapper central.
- Evitar llamadas fetch sueltas fuera de `api.ts`.
- Versionar contrato si cambian respuestas (`/api/v1/...`).
