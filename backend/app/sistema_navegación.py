import osmnx as ox
import networkx as nx
from pyproj import Transformer

origen  = (19.052746, -98.203822)
destino = (19.048740, -98.216471)

reportes_por_arista = {}

def peso_arista(negativos: int, longitud: float) -> float:
    factor = 5 if negativos > 3 else 1
    return longitud * factor

punto_centro = (
    (origen[0] + destino[0]) / 2,
    (origen[1] + destino[1]) / 2,
)
G = ox.graph_from_point(punto_centro, dist=3000, network_type="drive") #Implementa desde donde empieza

for u, v, key, data in G.edges(keys=True, data=True):
    reportes = reportes_por_arista.get((u, v), {"positivos": 0, "negativos": 0})
    data["peso"] = peso_arista(reportes["negativos"], data.get("length", 1))

G_proj = ox.project_graph(G)
crs = G_proj.graph["crs"]

transformer = Transformer.from_crs("EPSG:4326", crs, always_xy=True)
x_orig, y_orig = transformer.transform(origen[1],  origen[0])
x_dest, y_dest = transformer.transform(destino[1], destino[0])

nodo_origen  = ox.nearest_nodes(G_proj, X=x_orig, Y=y_orig)
nodo_destino = ox.nearest_nodes(G_proj, X=x_dest, Y=y_dest)

ruta = nx.shortest_path(G_proj, nodo_origen, nodo_destino, weight="peso")

 
"""Coordenadas de los nodos en la ruta"""

coords_ruta = [
    (G.nodes[nodo]["y"], G.nodes[nodo]["x"])  
    for nodo in ruta
]

print(f"Ruta con {len(coords_ruta)} puntos:") # Esto solo sirve para mostrar las coordenadas en la terminal (no es necesario)
for i, (lat, lon) in enumerate(coords_ruta):
    print(f"  {i+1:>3}. ({lat:.6f}, {lon:.6f})")

"""Grafico la ruta en el mapa"""
fig, ax = ox.plot_graph_route(G_proj, ruta, route_linewidth=4, node_size=0)