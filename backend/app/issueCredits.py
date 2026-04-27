import json
import os
from user import Clientes, Sistema

REGLAS_PUNTOS = {
    "reportar_bache": 15,
    "reportar_bici_danada": 20,
    "estacionar_en_dock": 5,
    "llevar_bici_a_estacion": 10,
    "bateria_cambiada": 5
}

def calcular_recompensa(id_usuario, tipo_reporte, titulo, descripcion):
    sistema = Sistema()
    sistema.cargar()
    datos = sistema.clientes

    for id, cliente in datos.items():
        if id == id_usuario:
            puntos = REGLAS_PUNTOS.get(tipo_reporte, 0)
            cliente.creditos += puntos
            sistema.guardar()
            
            info = {
                "nombre": cliente.nombre, 
                "titulo": titulo,
                "tipo_reporte": tipo_reporte,
                "descripcion": descripcion,
                "puntos_obtenidos": puntos, 
                "total_creditos": cliente.creditos
                }
            return info
    return {"error": "Usuario no encontrado"}

