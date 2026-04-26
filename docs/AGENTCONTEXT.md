# Agent Context: Yankuilotl+

## Proyecto
Yankuilotl+ es un ecosistema GovTech para la ciudad de Puebla que busca reducir el costo operativo (OpEx) de la micromovilidad pública mediante crowdsourcing y gamificación.

## Reglas de Negocio Críticas
1. **Intermodalidad:** El sistema debe reconocer y priorizar la Tarjeta RUTA.
2. **Costo Social:** El precio objetivo por viaje es de $7.50 MXN.
3. **Consenso de Validación:** Un reporte de infraestructura (bache) requiere 3 verificaciones de usuarios distintos para ser validado.
4. **Energy Hubs:** La carga no es centralizada; es distribuida a través de Battery Swapping realizado por los usuarios.

## Arquitectura de Datos
- **User Types:** `PRO` (Gamificado), `SENIOR` (Simplificado), `AMBASSADOR` (Ayudante).
- **Trust Score:** Escala 0-100. Afecta el multiplicador de recompensas y el acceso a unidades.
- **Cost Function:** $$Cost = \alpha(distancia) + \beta(vibración\_reportada) + \gamma(riesgo\_zona)$$

## Seguridad
- Enfoque en **Privacy by Design**. No almacenamiento de biometría en servidor.
- Mecanismo de **Remote Bricking** para unidades reportadas como robadas.

## STYLING

- Para escribir codigo, sigue las reglas de styling de docs/styling.md
- A cualquier duda de estilo consulta antes de escribir