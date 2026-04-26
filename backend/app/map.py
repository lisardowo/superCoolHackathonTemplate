
def get_nearby(lat: float = 19.0413, lng: float = -98.2062, radius_m: int = 1200) -> dict:
    return {
        "center": {"lat": lat, "lng": lng},
        "radius_m": radius_m,
        "items": [
            {"id": "hub-zocalo", "type": "hub", "lat": 19.0433, "lng": -98.1975},
            {"id": "hub-angelopolis", "type": "hub", "lat": 19.0322, "lng": -98.2335},
            {"id": "report-101", "type": "pothole", "lat": 19.0400, "lng": -98.2010},
        ],
    }
    
    #TODO change for yolotl ver