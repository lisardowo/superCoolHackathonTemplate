# Minimum Viable Product (MVP) - Yankuilotl+

## Alcance del Prototipo
El MVP demostrará el ciclo de vida de un usuario `PRO` y un usuario `SENIOR` en la ciudad de Puebla.

### Funcionalidades Core (Working):
1. **Mapa de Calor Vial:** Visualización de calles "sanas" vs "maltratadas" en el Centro Histórico y Angelópolis.
2. **Misión de Swap:** Flujo completo de:
   - Detectar batería baja.
   - Navegar al Energy Hub más cercano (Solesta/Universidades).
   - Simular intercambio y recepción de "Puntos Puebla".
3. **Validación de Bache:** Interfaz para reportar un bache y ver cómo el estado del segmento cambia en el backend al recibir múltiples validaciones.
4. **Pago NFC:** Simulación de inicio de viaje usando el ID de una Tarjeta RUTA.

### Exclusiones (Simulado/Mocks):
- Registro real de biometría (se mencionará como arquitectura).
- Cobro real a pasarela de pagos (se usará un stub de API).
- GPS en tiempo real de unidades físicas (se usará un set de datos estáticos).