# Agent Context
## Sistema de Transporte Comunitario Rural — Contexto para Agentes de IA

---

## Descripción del Proyecto

Sistema híbrido de movilidad compartida para zonas rurales de México que opera **sin requerir internet ni smartphone** por parte de los usuarios. Combina radio comunitaria (AM/FM), líneas telefónicas tradicionales y nodos LoRa de bajo costo para coordinar viajes compartidos entre conductores locales y pasajeros de la comunidad.

---

## Problema que Resuelve

Las zonas rurales carecen de opciones de transporte formal. Los habitantes (especialmente adultos mayores) dependen de viajes informales sin coordinación, lo que genera:

- Asientos vacíos en vehículos que ya van a la ciudad
- Pasajeros sin forma de enterarse de opciones disponibles
- Costo elevado por falta de economías de escala
- Exclusión digital de quienes no tienen smartphone o datos móviles

---

## Actores del Sistema

| Actor | Rol | Canal de Interacción |
|---|---|---|
| **Conductor local** | Registra su ruta y asientos disponibles | Llamada telefónica, nodo LoRa o app web (si tiene conectividad) |
| **Pasajero** | Escucha opciones y reserva un lugar | Radio + llamada telefónica o botón en nodo LoRa |
| **Operador central** | Recibe llamadas, confirma reservas, gestiona incidencias | Software central + teléfono |
| **Locutor de radio** | Transmite el boletín de viajes en cortes comerciales | Texto/audio generado por el sistema |
| **Punto LoRa (tienda/plaza)** | Hospeda el nodo físico; puede recibir tráfico adicional de clientes | Físico |

---

## Flujo Principal

```
1. Conductor registra ruta
   └─ Por teléfono → Operador ingresa al sistema
   └─ Por nodo LoRa → Interfaz física → Mensaje LoRa → Gateway → Software central

2. Software central consolida rutas del día siguiente
   └─ Genera boletín: origen, destino, hora, asientos, punto de encuentro

3. Radio local transmite el boletín en cortes comerciales

4. Pasajero escucha la opción y reserva
   └─ Llamada telefónica → Operador confirma y descuenta asiento
   └─ Nodo LoRa → Botón "reservar" → Sistema descuenta asiento

5. Pasajero se presenta en el punto acordado a la hora indicada
```

---

## Restricciones del Contexto

- **Sin internet en el usuario final**: toda la interfaz con pasajeros y conductores debe funcionar offline desde su perspectiva
- **Baja alfabetización digital**: los flujos deben ser extremadamente simples (máximo 2 pasos para el usuario)
- **Presupuesto mínimo**: el hardware por nodo no debe superar los $50 USD; la tarifa por viaje debe ser simbólica
- **Sin cobertura celular en zonas objetivo**: LoRa es el único canal de datos disponible en campo
- **Dependencia de adopción comunitaria**: el sistema muere sin masa crítica de conductores registrados

---

## Limitaciones Conocidas

| Limitación | Impacto | Mitigación actual |
|---|---|---|
| Seguridad de conductores | No se puede hacer vetting profundo | Registro básico gratuito (licencia + nombre) |
| Cancelaciones de último momento | No hay forma de notificar a pasajeros sin internet | Sin solución en MVP; se abordará en v2 |
| Mantenimiento de hardware LoRa | Los nodos en plazas públicas pueden sufrir vandalismo o desgaste | Carcasa resistente; responsabilidad delegada al punto de hospedaje |
| Planeación solo anticipada | El sistema anuncia viajes del día siguiente, no en tiempo real | Aceptado como limitación de diseño |

---

## Vocabulario del Dominio

- **Nodo LoRa / Emisor**: dispositivo físico instalado en un punto comunitario que permite enviar y recibir mensajes por radiofrecuencia LoRa sin internet
- **Boletín**: resumen de viajes disponibles generado por el software central y transmitido por radio
- **Central**: el software + operador humano que centraliza toda la lógica del sistema
- **Punto de encuentro**: lugar físico acordado donde el pasajero aborda el vehículo del conductor
- **Ruta**: viaje con origen, destino, hora y número de asientos disponibles registrado por un conductor
