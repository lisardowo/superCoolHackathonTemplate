# MVP — Mínimo Producto Viable
## Sistema de Transporte Comunitario Rural (Radio + LoRa)

---

## Objetivo del MVP

Demostrar que es posible coordinar viajes compartidos en zonas rurales sin internet ni smartphone, usando únicamente radio comunitaria y nodos LoRa en puntos clave de la comunidad.

---

## Alcance del MVP (Una comunidad piloto)

### Lo que SÍ incluye

- **1 nodo LoRa** instalado en un punto de alta afluencia (plaza principal o tienda de abarrotes)
- **Software central básico** que recibe rutas de conductores y genera un boletín de viajes
- **Integración con radio local** para transmitir el boletín en cortes comerciales
- **Canal telefónico** para registro de conductores y reserva de asientos
- **Registro simplificado de conductores** (nombre, CURP, licencia) — la "licencia" del sistema
- **Flujo completo de reserva**: conductor registra ruta → sistema genera boletín → pasajero escucha en radio → pasajero reserva por teléfono o nodo LoRa → se presenta al punto de encuentro

### Lo que NO incluye el MVP

- App móvil
- Pagos digitales (la tarifa se cobra en efectivo directamente al conductor)
- Múltiples nodos por comunidad
- Notificaciones en tiempo real de cancelaciones
- Expansión a más de una comunidad

---

## Stack Técnico Mínimo

| Componente | Solución |
|---|---|
| Nodo LoRa | Microcontrolador + módulo LoRa + pantalla E-Ink + 2 botones + panel solar |
| Software central | Aplicación web ligera (Node.js o Python) en servidor local o VPS básico |
| Comunicación LoRa | Gateway LoRaWAN de bajo costo conectado al software central por WiFi/Ethernet |
| Canal de voz | Número telefónico local (línea fija o SIM básica) atendido por operador |
| Boletín | Texto generado automáticamente, leído en antena por locutor o reproducido como audio |

---

## Criterios de Éxito del MVP

1. Al menos **5 conductores registrados** en la primera semana
2. Al menos **10 reservas completadas** en el primer mes
3. **Tasa de presentación** (pasajero llega al punto acordado) ≥ 70%
4. **Tasa de cumplimiento del conductor** ≥ 80%
5. Costo operativo por viaje ≤ al transporte colectivo informal existente

---

## Supuestos Clave a Validar

- Los conductores están dispuestos a registrar sus rutas a cambio de una tarifa baja
- Los adultos mayores adoptan la radio como canal suficiente para enterarse de los viajes
- El nodo LoRa en la plaza es usado sin necesidad de capacitación extensa
- La radio local acepta transmitir el boletín de viajes (modelo de colaboración o pago mínimo)
