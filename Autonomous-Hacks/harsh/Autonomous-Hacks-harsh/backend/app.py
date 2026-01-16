from fastapi import FastAPI
from routes.waste_description_routes import router as waste_description_router
from routes.waste_management_routes import router as waste_management_router
from routes.sensors import router as sensors_router

app = FastAPI()

# Add CORS Middleware
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173", 
        "http://localhost:3000", "http://127.0.0.1:3000",
        "http://localhost:8080", "http://127.0.0.1:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if waste_description_router:
    app.include_router(waste_description_router, prefix="/waste-description", tags=["Waste Description"])
if waste_management_router:
    app.include_router(waste_management_router, prefix="/waste-management", tags=["Waste Management"])
app.include_router(sensors_router, tags=["Sensors"])

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)