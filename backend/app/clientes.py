import json
import os

class Clientes():
    def __init__(self, nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta):
        self.nombre = nombre
        self.correo_electronico = correo_electronico
        self.edad = edad
        self.Tarjeta = Tarjeta
        self.Tarjeta_ruta = Tarjeta_ruta

class Sistema():
    def __init__(self):
        self.clientes = {}
        self.path = "backend/app/base_de_datos/clientes.json"
        self.cargar()
        self.id = max(self.clientes.keys(), default=0) + 1

    def agregar_cliente(self, nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta):
        self.clientes[self.id] = Clientes(nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta)
        self.guardar()
        self.id += 1

    def guardar(self):
        os.makedirs(os.path.dirname(self.path), exist_ok=True)
        data = {
            id: vars(cliente)
            for id, cliente in self.clientes.items()
        }
        with open(self.path, "w") as f:
            json.dump(data, f, indent=4)

    def cargar(self):
        if not os.path.exists(self.path):
            return
        with open(self.path, "r") as f:
            contenido = f.read()
            if not contenido.strip():
                return
            data = json.loads(contenido)
        self.clientes = {
            int(id): Clientes(**attrs)
            for id, attrs in data.items()
        }

sis = Sistema()
sis.agregar_cliente("e", "f", 1, "g", "h")