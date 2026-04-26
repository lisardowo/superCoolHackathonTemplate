import json
import os

def get_all_hubs():
    """
    Lee el archivo puebla_data.Json y transforma estaciones y puntos 
    de interés en un formato unificado para el mapa.
    """
    # Construcción de la ruta dinámica al archivo JSON
    path = os.path.join(os.path.dirname(__file__), "puebla_data.Json")
    
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        return []

    hubs = []

    # 1. Procesar estaciones de transporte (Líneas 1, 2, 3 y 4)
    for linea in data["transporte"]["lineas"]:
        line_name = linea["nombre"]
        line_color = linea["color"]
        
        for estacion in linea["estaciones"]:
            hubs.append({
                "id": estacion["id"],
                "name": f"{line_name}: {estacion['nombre']}",
                "lat": estacion["lat"],
                "lng": estacion["lng"],
                "type": "RUTA_STATION",
                "color": line_color,
                "category": "Transporte"
            })

    # 2. Procesar puntos de interés (Universidades y Plazas)
    for categoria, items in data["puntos_interes"].items():
        for item in items:
            hubs.append({
                "id": item["id"],
                "name": item["nombre"],
                "lat": item["lat"],
                "lng": item["lng"],
                "type": categoria.upper().rstrip('S'), # Ejemplo: UNIVERSIDADE -> UNIVERSIDAD
                "category": categoria.capitalize(),
                "linea_cercana": item.get("linea_cercana"),
                "estacion_cercana": item.get("estacion_cercana")
            })

    return hubs