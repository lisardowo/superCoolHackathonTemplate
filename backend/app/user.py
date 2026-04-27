import json
import os
from guardar import funcion_guardar
class Clientes():
    def __init__(self, nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta, creditos = 0):
        self.nombre = nombre
        self.correo_electronico = correo_electronico
        self.edad = edad
        self.Tarjeta = Tarjeta
        self.Tarjeta_ruta = Tarjeta_ruta
        self.creditos = creditos
class Sistema():
    def __init__(self):
        self.clientes = {}
        self.path = "backend/app/base_de_datos/clientes.json"
        self.cargar()
        self.id = max(self.clientes.keys(), default=0) + 1

    def guardar(self):
        funcion_guardar(self.clientes)

    def agregar_cliente(self, nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta):
        self.clientes[self.id] = Clientes(nombre, correo_electronico, edad, Tarjeta, Tarjeta_ruta)
        self.id += 1

    def cargar(self):
        if not os.path.exists(self.path):
            return
        with open(self.path, "r") as f:
            contenido = f.read()
            if not contenido.strip():
                return
            data = json.loads(contenido)

            for k, v in data.items():
                self.clientes[int(k)] = Clientes(**v)

