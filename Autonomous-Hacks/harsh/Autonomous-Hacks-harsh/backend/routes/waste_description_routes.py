from fastapi import APIRouter, UploadFile, File, HTTPException
from core.waste_description import analyze_image
import tempfile
import shutil

router = APIRouter()

@router.post("/analyze-image/")
def analyze_uploaded_image(file: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name
        result = analyze_image(tmp_path)
        return {"incident": result}
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"ERROR DETAILES: {e}")
        raise HTTPException(status_code=500, detail=str(e))
