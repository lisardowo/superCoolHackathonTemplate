# Frontend (React + TypeScript)

## Stack

- React 18
- TypeScript
- Vite

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Consideraciones para hackathon

- Centraliza llamadas HTTP en `src/lib/api.ts`.
- No dupliques `fetch` en componentes.
- Tipa request/response antes de consumir endpoints.
- Usa variables `VITE_` para exponer config al cliente.

## Variables de entorno

- `VITE_API_BASE_URL`: URL base del backend.

## Flujo recomendado

1. Definir endpoint en backend.
2. Agregar tipo y funcion en `src/lib/api.ts`.
3. Consumir funcion en UI.
4. Probar local y en Render.
