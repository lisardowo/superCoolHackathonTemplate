# Distribución de Tareas del Equipo
## Sistema de Transporte Comunitario Rural

---

## El Equipo

| ID | Rol | Nivel | Notas |
|---|---|---|---|
| **TU** | UI/UX — React | Medio + Python cuando libres | Foco en front; se integra al backend cuando no hay UI pendiente |
| **Senior** | Backend Python | Senior | Arquitectura, decisiones técnicas críticas, code review |
| **Novato A** | Backend Python | Básico + IA | Tareas acotadas con output claro |
| **Novato B** | Backend Python | Básico + IA | Tareas acotadas con output claro |

---

## Principio de Distribución

- El **Senior** diseña la arquitectura y no hace tareas que bloqueen a otros — su tiempo vale para decisiones, no para CRUD básico.
- Los **novatos** reciben tareas con input y output bien definido; la IA los guía en la implementación.
- **Tú** eres el puente: sabes suficiente de ambos lados para desatascar bloqueos y el backend te absorbe cuando el front está estable.
- Todas las tareas asumen uso activo de IA (Copilot, Claude) para escribir, revisar y debuggear código.

---

## Fase 0 — Validación (Semanas 1–4)
> No hay código todavía. El equipo se prepara mientras se valida con usuarios.

| Tarea | Responsable | Descripción |
|---|---|---|
| Diseño de entrevistas con conductores | **Tú** | Guión de 5 preguntas para validar disposición a registrar rutas |
| Diseño de entrevistas con pasajeros | **Novato A** | Guión enfocado en uso de radio y teléfono |
| Investigación de módulos LoRa disponibles en MX | **Novato B** | Lista de opciones con precio, disponibilidad y datasheet |
| Definición de arquitectura del software central | **Senior** | Diagrama de componentes: qué módulos existen, cómo se comunican |
| Wireframes del panel del operador central | **Tú** | Bocetos en Figma o papel de las pantallas que usará el operador |

---

## Fase 1 — MVP (Meses 1–3)

### Software Central (Backend)

| Tarea | Responsable | Descripción | Dificultad |
|---|---|---|---|
| Setup del proyecto: estructura de carpetas, repo, `.env`, dependencias | **Senior** | Crea la base sobre la que todos trabajan | — |
| Modelo de datos: `Conductor`, `Ruta`, `Reserva`, `Asiento` | **Senior** | Define los modelos con SQLite o PostgreSQL, migraciones incluidas | — |
| Endpoint: registrar ruta (POST `/rutas`) | **Novato A** | Recibe origen, destino, hora, asientos, conductor\_id. Valida y guarda. | Baja |
| Endpoint: listar rutas del día siguiente (GET `/rutas/manana`) | **Novato B** | Filtra rutas por fecha, devuelve JSON con los datos del boletín | Baja |
| Endpoint: hacer reserva (POST `/reservas`) | **Novato A** | Descuenta un asiento de la ruta, guarda pasajero básico (nombre, teléfono) | Baja-Media |
| Generador de boletín en texto | **Novato B** | Toma el JSON de rutas y genera un texto legible para el locutor de radio | Baja |
| Registro y autenticación de conductores | **Senior** | Registro simplificado (nombre, teléfono, CURP, licencia). Sin OAuth complejo. | — |
| Integración LoRa → Software central | **Senior** | Recibe mensajes del gateway LoRaWAN y los traduce a llamadas internas | Alta |
| Tests unitarios de los endpoints principales | **Tú** (cuando libre) | Cubre los 3 endpoints críticos con pytest básico guiado por IA | Media |

---

### Panel del Operador (Frontend — React)

| Tarea | Responsable | Descripción | Dificultad |
|---|---|---|---|
| Setup: Vite + React + TailwindCSS | **Tú** | Base del proyecto front, configuración inicial | — |
| Vista: lista de rutas del día | **Tú** | Tabla con rutas activas, asientos disponibles, estado | Media |
| Vista: formulario para registrar ruta manualmente | **Tú** | El operador ingresa la ruta cuando el conductor llama por teléfono | Media |
| Vista: formulario para hacer una reserva | **Tú** | El operador reserva el asiento mientras habla con el pasajero | Media |
| Vista: boletín generado (preview antes de enviar a radio) | **Tú** | Muestra el texto del boletín, botón "marcar como enviado" | Baja |
| Conexión front → API (fetch/axios, manejo de errores) | **Tú** | Conecta todas las vistas al backend del Senior | Media |

---

### Hardware LoRa (Investigación + Prototipo)

| Tarea | Responsable | Descripción |
|---|---|---|
| Prototipo de nodo LoRa en breadboard | **Novato B** (con guía del Senior) | Microcontrolador + módulo LoRa + 2 botones. La IA genera el código base. |
| Script receptor en el gateway | **Senior** | Recibe paquetes LoRa y los reenvía al software central vía HTTP local |
| Documentación de comandos del nodo | **Novato B** | README con los mensajes que envía el nodo (reservar, registrar ruta) |

---

## Fase 2 — Consolidación (Meses 4–6)

| Tarea | Responsable | Descripción |
|---|---|---|
| Módulo de alertas por radio (cancelaciones) | **Novato A** | Endpoint que genera un texto de alerta cuando se cancela una ruta |
| Dashboard de métricas para el operador | **Tú** | Gráficas simples: viajes por día, tasa de llenado, rutas más demandadas |
| Guía de mantenimiento del nodo LoRa | **Novato B** | Documento para el dueño de la tienda: cómo cambiar batería, limpiar panel solar |
| Refactor y optimización del backend | **Senior** | Code review general, mejora de performance, preparación para multi-comunidad |
| Segunda comunidad: checklist de despliegue | **Tú + Senior** | Qué pasos hay que seguir para instalar el sistema en una nueva comunidad |

---

## Fase 3 — Expansión (Meses 7–12)

| Tarea | Responsable | Descripción |
|---|---|---|
| Kit de despliegue replicable | **Senior** | Script o docker-compose que levanta todo el stack en < 1 hora |
| Texto-a-voz básico para el boletín | **Novato A** | Integración con gTTS o similar para generar audio del boletín automáticamente |
| Red LoRa inter-comunitaria (diseño) | **Senior** | Arquitectura para que nodos de distintas comunidades compartan rutas |
| Mejoras de UI basadas en feedback de operadores | **Tú** | Iteración del panel según lo que los operadores reales reportan |

---

## Reglas de Colaboración

1. **El Senior hace code review** de todo lo que los novatos suben a main. Sin excepciones.
2. **Los novatos usan la IA para el primer draft** del código, pero deben entender lo que están subiendo — si no lo entienden, lo preguntan antes de hacer PR.
3. **Tú eres el QA informal del front**: si una vista no funciona bien en móvil o es confusa para el operador, la regresamos antes de marcarla como lista.
4. **Una tarea = una rama** en git. Nada directo a main.
5. **Bloqueos se escalan en el día**: si un novato está bloqueado más de 2 horas, pide ayuda al Senior o a ti.
