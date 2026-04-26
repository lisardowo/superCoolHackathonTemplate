import json
import os

def funcion_guardar(datos):
    path = "backend/app/base_de_datos/clientes.json"

    os.makedirs(os.path.dirname(path), exist_ok=True)
    data = {
        id: vars(cliente)
        for id, cliente in datos.items()
    }
    with open(path, "w") as f:
        json.dump(data, f, indent=4)

