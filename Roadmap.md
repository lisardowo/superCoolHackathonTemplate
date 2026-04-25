# Roadmap
## Sistema de Transporte Comunitario Rural

---

## Visión a Largo Plazo

Convertirse en la infraestructura de movilidad compartida de referencia para comunidades rurales de México y Latinoamérica, operando de forma autónoma, sostenible y replicable sin dependencia de conectividad urbana.

---

## Fase 0 — Validación de Hipótesis (Semanas 1–4)

**Objetivo:** Confirmar que el problema existe y que los actores clave están dispuestos a participar antes de escribir una sola línea de código.

- [ ] Entrevistas con 10+ conductores locales en la comunidad piloto
- [ ] Entrevistas con 20+ pasajeros potenciales (adultos mayores incluidos)
- [ ] Negociación con radio local para acuerdo de transmisión del boletín
- [ ] Identificación del punto LoRa piloto (tienda/plaza)
- [ ] Mapeo de rutas frecuentes existentes (ciudad más cercana, mercados, clínicas)

**Entregable:** Documento de validación con al menos 5 conductores comprometidos a participar en el piloto.

---

## Fase 1 — MVP (Meses 1–3)

**Objetivo:** Tener el ciclo completo funcionando en una sola comunidad.

### Mes 1 — Infraestructura base
- [ ] Desarrollo del software central (registro de rutas, generación de boletín)
- [ ] Configuración del canal telefónico con operador
- [ ] Ensamblado y prueba del primer nodo LoRa
- [ ] Instalación del nodo en el punto piloto

### Mes 2 — Integración con radio
- [ ] Pruebas de transmisión del boletín en horario real
- [ ] Capacitación del operador central
- [ ] Onboarding de primeros 5 conductores
- [ ] Primeras reservas y viajes reales

### Mes 3 — Iteración
- [ ] Análisis de métricas de adopción y cumplimiento
- [ ] Ajuste del flujo de registro de conductores según fricción detectada
- [ ] Documentación del modelo operativo replicable
- [ ] Decisión de continuar / pivotar / escalar

**KPIs de salida:** 5+ conductores activos, 10+ viajes coordinados, tasa de presentación ≥ 70%

---

## Fase 2 — Consolidación y Resiliencia (Meses 4–6)

**Objetivo:** Hacer el sistema más robusto y empezar a resolver las limitaciones del MVP.

- [ ] **Sistema de alertas por radio**: protocolo para anunciar cancelaciones de último momento en la siguiente transmisión
- [ ] **Segundo nodo LoRa** en un punto distinto de la comunidad (aumentar cobertura)
- [ ] **Guía de mantenimiento** para el punto hospedador del nodo (reemplazo de baterías, limpieza)
- [ ] **Modelo de sostenibilidad financiera**: definir si el ingreso viene de tarifa al conductor, sponsors de radio, municipio, o combinación
- [ ] **Panel de métricas** para el operador central (viajes por día, tasa de llenado, rutas más demandadas)
- [ ] Inicio de conversaciones con segunda comunidad piloto

**KPIs de salida:** Sistema operando 30 días consecutivos sin intervención técnica externa, al menos 1 nodo funcionando de forma autónoma con mantenimiento local.

---

## Fase 3 — Expansión (Meses 7–12)

**Objetivo:** Replicar el modelo en 3–5 comunidades adicionales y automatizar la operación.

- [ ] **Kit de despliegue replicable**: hardware + software + guía operativa lista para instalar en nueva comunidad en menos de 1 semana
- [ ] **Red LoRa inter-comunitaria**: nodos de distintas comunidades comparten información de rutas que cruzan territorios
- [ ] **Automatización del boletín por voz**: texto-a-voz básico para reducir dependencia del locutor humano
- [ ] **Modelo de franquicia comunitaria**: cada comunidad tiene su propio operador capacitado y autosuficiente
- [ ] **Integración con servicios de salud y gobierno**: coordinar rutas a clínicas, juzgados, oficinas del SAT, etc.

**KPIs de salida:** 5 comunidades activas, 50+ conductores registrados en total, costo por viaje ≤ 50% del transporte informal equivalente.

---

## Fase 4 — Escalabilidad Regional (Año 2+)

**Objetivo:** Plataforma replicable a nivel estatal / nacional con impacto medible en movilidad rural.

- [ ] API abierta para integración con programas de gobierno (IMSS Bienestar, Sembrando Vida, etc.)
- [ ] Módulo de pago básico (transferencia SPEI o efectivo con confirmación por LoRa)
- [ ] Dashboard regional para autoridades municipales
- [ ] Estudio de impacto: reducción de costos de transporte, acceso a servicios de salud, inclusión de adultos mayores
- [ ] Búsqueda de financiamiento: fondos de innovación social, CONACYT, BID Lab, USAID

---

## Riesgos y Dependencias Críticas

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Baja adopción de conductores | Alta | Crítico | Incentivo económico claro; registro sin fricción |
| Radio local no colabora | Media | Crítico | Tener canal alternativo (altavoz comunitario, WhatsApp grupal como fallback) |
| Vandalismo del nodo LoRa | Media | Alto | Carcasa robusta; seguro comunitario informal |
| Cancelaciones sin notificación | Alta | Medio | Aceptado en MVP; protocolo de radio en Fase 2 |
| Falta de financiamiento post-MVP | Media | Alto | Modelo auto-sostenible desde Fase 2 |
