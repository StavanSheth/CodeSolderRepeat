from fastapi import FastAPI
from routes.waste_description_routes import router as waste_description_router
from routes.waste_management_routes import router as waste_management_router

app = FastAPI()

# Add CORS Middleware
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(waste_description_router, prefix="/waste-description", tags=["Waste Description"])
app.include_router(waste_management_router, prefix="/waste-management", tags=["Waste Management"])

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)