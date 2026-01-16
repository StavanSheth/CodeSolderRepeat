from fastapi import APIRouter, HTTPException
from typing import Dict, List
from datetime import datetime
from schemas import SensorDataCreate, SensorDataResponse

router = APIRouter()

# In-memory store for latest sensor data: {bin_id: SensorDataResponse}
# In a real app, this would be a database.
sensor_store: Dict[int, SensorDataResponse] = {}

# Store history for charts: {bin_id: [SensorDataResponse]}
# Limiting to last 50 points to prevent memory issues in this demo
sensor_history: Dict[int, List[SensorDataResponse]] = {}

@router.post("/sensors", response_model=SensorDataResponse)
async def receive_sensor_data(data: SensorDataCreate):
    # Process raw data
    lid_status = "CLOSED" if data.lid_state == 1 else "OPEN"
    weight_kg = data.weight / 1000.0
    ammonia_ppm = data.ammonia / 10.0
    
    processed_data = SensorDataResponse(
        bin_id=data.bin_id,
        lid_status=lid_status,
        weight_kg=weight_kg,
        ammonia_ppm=ammonia_ppm,
        fill_level_pct=data.fill_level,
        timestamp=datetime.now()
    )
    
    # Store latest
    sensor_store[data.bin_id] = processed_data
    
    # Store history
    if data.bin_id not in sensor_history:
        sensor_history[data.bin_id] = []
    
    sensor_history[data.bin_id].append(processed_data)
    
    # Keep only last 50 records
    if len(sensor_history[data.bin_id]) > 50:
        sensor_history[data.bin_id].pop(0)
        
    return processed_data

@router.get("/sensors/{bin_id}", response_model=SensorDataResponse)
async def get_latest_sensor_data(bin_id: int):
    if bin_id not in sensor_store:
        raise HTTPException(status_code=404, detail="Sensor data not found")
    return sensor_store[bin_id]

@router.get("/sensors/{bin_id}/history", response_model=List[SensorDataResponse])
async def get_sensor_history(bin_id: int):
    if bin_id not in sensor_history:
        return []
    return sensor_history[bin_id]
