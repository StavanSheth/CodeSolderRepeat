from fastapi import APIRouter, HTTPException
from core.waste_management import generate_solutions
from pydantic import BaseModel

router = APIRouter()

class WasteInput(BaseModel):
    input_json: dict

@router.post("/generate-solutions/")
def generate_waste_solutions(data: WasteInput):
    try:
        result = generate_solutions(data.input_json)
        return result.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
