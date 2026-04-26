import json
from datetime import datetime

REGLAS_PUNTOS = {
    "reportar_bache": 15,
    "reportar_bici_danada": 20,
    "estacionar_en_dock": 5,
    "llevar_bici_a_estacion": 10,
    "bateria_cambiada": 5
}

# Historial global de acciones y puntos por usuario
historial = []
puntos_por_usuario = {}

def calcular_recompensa(usuario_id, tipo_accion, estacion_vacia=False, hora_pico=False):
    puntos_base = REGLAS_PUNTOS.get(tipo_accion, 0)

    if puntos_base == 0:
        resultado = {
            "usuario_id": usuario_id,
            "accion": tipo_accion,
            "valida": False,
            "puntos_base": 0,
            "multiplicador": 0,
            "puntos_totales": 0,
            "motivo": "Acción no reconocida",
            "timestamp": datetime.utcnow().isoformat()
        }
        historial.append(resultado)
        return json.dumps(resultado, ensure_ascii=False, indent=2)

    multiplicador = 1
    motivo = "Acción estándar"

    if tipo_accion == "llevar_bici_a_estacion":
        if estacion_vacia:
            multiplicador = 3
            motivo = "Rebalanceo a estación vacía (x3)"
        elif hora_pico:
            multiplicador = 2
            motivo = "Rebalanceo en hora pico (x2)"
        else:
            motivo = "Rebalanceo estándar"

    puntos_totales = puntos_base * multiplicador

    # Acumular puntos del usuario
    if usuario_id not in puntos_por_usuario:
        puntos_por_usuario[usuario_id] = 0
    puntos_por_usuario[usuario_id] += puntos_totales

    resultado = {
        "usuario_id": usuario_id,
        "accion": tipo_accion,
        "valida": True,
        "puntos_base": puntos_base,
        "multiplicador": multiplicador,
        "puntos_totales": puntos_totales,
        "puntos_acumulados": puntos_por_usuario[usuario_id],  # total del usuario hasta ahora
        "motivo": motivo,
        "timestamp": datetime.utcnow().isoformat()
    }

    historial.append(resultado)
    return json.dumps(resultado, ensure_ascii=False, indent=2)


def exportar_resumen():
    """Devuelve un JSON con el ranking de usuarios y el historial completo."""


    resumen = {
        "resumen_generado": datetime.utcnow().isoformat(),
        "total_usuarios": len(puntos_por_usuario),
        "total_acciones": len(historial),
        "historial": historial
    }

    return json.dumps(resumen, ensure_ascii=False, indent=2)