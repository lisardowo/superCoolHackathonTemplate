import osmnx as ox
import networkx as nx
from pyproj import Transformer
from fastapi import APIRouter
from pydantic import BaseModel
from reports import reportes_por_arista


router = APIRouter(prefix="/api/map", tags=["map"])


class Coordenadas(BaseModel):
    origen: tuple[float, float]
    destino: tuple[float, float]


def return_cords(cords_ruta):
    """Retorna las coordenadas al frontend"""
    return {"nodos": cords_ruta}


def peso_arista(negativos: int, longitud: float) -> float:
    factor = 5 if negativos > 3 else 1
    return longitud * factor


def calcular_ruta(origen: tuple, destino: tuple):
    """Calcula la ruta óptima entre dos puntos"""
    punto_centro = (
        (origen[0] + destino[0]) / 2,
        (origen[1] + destino[1]) / 2,
    )
    G = ox.graph_from_point(punto_centro, dist=3000, network_type="drive")

    for u, v, key, data in G.edges(keys=True, data=True):
        reportes = reportes_por_arista.get((u, v), {"positivos": 0, "negativos": 0})
        data["peso"] = peso_arista(reportes["negativos"], data.get("length", 1))

    G_proj = ox.project_graph(G)
    crs = G_proj.graph["crs"]

    transformer = Transformer.from_crs("EPSG:4326", crs, always_xy=True)
    x_orig, y_orig = transformer.transform(origen[1], origen[0])
    x_dest, y_dest = transformer.transform(destino[1], destino[0])

    nodo_origen = ox.nearest_nodes(G_proj, X=x_orig, Y=y_orig)
    nodo_destino = ox.nearest_nodes(G_proj, X=x_dest, Y=y_dest)

    ruta = nx.shortest_path(G_proj, nodo_origen, nodo_destino, weight="peso")

    coords_ruta = [
        (G.nodes[nodo]["y"], G.nodes[nodo]["x"])
        for nodo in ruta
    ]

    return coords_ruta


@router.post("/route")
def get_route(coords: Coordenadas):
    """Endpoint para obtener la ruta entre dos puntos"""
    coords_ruta = calcular_ruta(coords.origen, coords.destino)
    return return_cords(coords_ruta)