from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SensorDataCreate(BaseModel):
    bin_id: int
    lid_state: int  # 1 for Closed, 2 for Open
    weight: int     # Raw value (e.g., 7830 -> 7.83 kg)
    ammonia: int    # Raw value (e.g., 184 -> 18.4 ppm)
    fill_level: int # Percentage

class SensorDataResponse(BaseModel):
    bin_id: int
    lid_status: str # "OPEN" or "CLOSED"
    weight_kg: float
    ammonia_ppm: float
    fill_level_pct: int
    timestamp: datetime
