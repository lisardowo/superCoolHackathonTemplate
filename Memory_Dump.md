# Memory Dump — Proyecto Transporte Rural
## Para agentes de IA / Copilot: lee esto primero antes de tocar cualquier otro archivo

---

## Qué es este proyecto

Un sistema de transporte compartido para zonas rurales de México que funciona **sin internet ni smartphone**. Usa radio comunitaria (AM/FM), líneas telefónicas y nodos LoRa (radiofrecuencia de bajo costo) para conectar conductores con pasajeros. Fue concebido en un hackathon.

El problema central: en comunidades rurales no hay transporte formal. Los conductores viajan a la ciudad con asientos vacíos y los pasajeros (especialmente adultos mayores) no tienen forma de enterarse ni coordinar viajes.

---

## Archivos que existen y qué contienen

### `MVP.md`
Define el **alcance del producto mínimo viable**. Responde: ¿qué construimos primero y cómo sabemos si funcionó?

Cosas clave que están ahí:
- Alcance exacto del MVP: 1 nodo LoRa, software central básico, radio + teléfono como únicos canales
- Lo que explícitamente **no** incluye (no hay app, no hay pagos digitales, no hay tiempo real)
- Stack técnico mínimo (microcontrolador + LoRa + E-Ink + panel solar; servidor básico en Node.js o Python)
- 5 KPIs de éxito con números concretos (ej. tasa de presentación ≥ 70%)
- Supuestos a validar con usuarios reales

Cuándo usarlo: cuando alguien pregunte qué construir, qué entra en el primer release, o cómo medir el éxito.

---

### `Agent_Context.md`
Es el **contexto de dominio** del sistema. Responde: ¿cómo funciona esto y quiénes son los actores?

Cosas clave que están ahí:
- Descripción del problema en lenguaje técnico
- Tabla de 5 actores: Conductor, Pasajero, Operador central, Locutor de radio, Punto LoRa (tienda/plaza)
- Flujo principal paso a paso (conductor registra → sistema genera boletín → radio transmite → pasajero reserva → se presenta)
- Restricciones duras del contexto (sin internet en usuario final, baja alfabetización digital, presupuesto < $50 USD por nodo, sin cobertura celular)
- Tabla de 4 limitaciones conocidas con su impacto y mitigación actual
- Glosario de términos del dominio (nodo LoRa, boletín, central, punto de encuentro, ruta)

Cuándo usarlo: antes de escribir código, diseñar flujos, redactar prompts o tomar decisiones de arquitectura. Es la fuente de verdad sobre cómo funciona el sistema.

---

### `Roadmap.md`
Define **cuándo pasa qué**. Responde: ¿cuál es el plan de 12+ meses?

Cosas clave que están ahí:
- **Fase 0** (semanas 1–4): validación de hipótesis con entrevistas, sin código
- **Fase 1** (meses 1–3): MVP completo en una comunidad piloto, dividido mes a mes
- **Fase 2** (meses 4–6): resiliencia — sistema de alertas por radio, segundo nodo, modelo financiero
- **Fase 3** (meses 7–12): expansión a 3–5 comunidades, automatización del boletín por voz
- **Fase 4** (año 2+): escalabilidad regional, API para gobierno, pagos básicos
- Tabla de 5 riesgos críticos con probabilidad, impacto y mitigación

Cuándo usarlo: cuando alguien pregunte sobre prioridades, qué sigue, qué es "futuro" vs "ahora", o qué depende de qué.

---

## Decisiones de diseño importantes que NO están explícitas en los archivos

Estas decisiones se tomaron implícitamente y debes respetarlas al sugerir cambios:

1. **La interfaz de usuario es la radio, no una pantalla.** El canal principal de comunicación hacia el pasajero es audio (radio AM/FM). No se diseña para pantallas en el lado del usuario final.

2. **El operador humano es parte del sistema, no un workaround.** La central telefónica con operador no es temporal — es la capa de accesibilidad permanente para quien no puede usar el nodo LoRa.

3. **El conductor es el proveedor de oferta, no un empleado.** No hay relación laboral. El conductor registra su ruta a voluntad a cambio de llenar sus asientos. Si el proceso se vuelve difícil, simplemente deja de registrar.

4. **El nodo LoRa no es un cajero automático.** Tiene exactamente 2 botones y una pantalla E-Ink básica. No es un dispositivo táctil ni tiene menús complejos.

5. **Los pagos son siempre en efectivo entre conductor y pasajero.** El sistema no toca dinero en el MVP ni en Fase 2.

6. **La escalabilidad es por replicación, no por centralización.** Cada comunidad tiene su propio ecosistema (nodo + radio + operador). No hay un mega-servidor que controle todo.

---

## Limitaciones que ya se aceptaron como "vivir con ellas" (no reabrir)

- No hay forma de notificar cancelaciones de último momento en el MVP. Se aborda en Fase 2 vía radio.
- La seguridad del conductor es parcial. El registro básico es suficiente para el MVP; no se exigirá antecedentes penales.
- El sistema no funciona para emergencias ni viajes no planeados. Solo coordina viajes del día siguiente.

---

## Tono y contexto del equipo

- El proyecto fue presentado en un **hackathon** (documento original en español).
- El equipo ya reconoció las limitaciones del sistema en el PDF original — no las descubriste tú.
- El lenguaje de trabajo es **español**.
- Las decisiones priorizan **inclusión y simplicidad** sobre features técnicas avanzadas.

---

## Cómo ayudar bien en este proyecto

- Si te piden escribir código: revisa `Agent_Context.md` primero para entender las restricciones del stack
- Si te piden priorizar features: consulta `Roadmap.md` para saber en qué fase estamos
- Si te piden diseñar un flujo: el actor más importante a proteger es el **pasajero adulto mayor sin smartphone**
- Si algo parece contradecir los archivos: pregunta antes de cambiar. Las restricciones son intencionales.
- Si te piden agregar internet o una app al MVP: la respuesta es no, por diseño.
