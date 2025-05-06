from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from .core.config import get_settings
from .api.v1.endpoints import analysis

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure les routers
app.include_router(
    analysis.router,
    prefix=f"{settings.API_V1_STR}/analyses",
    tags=["analyses"]
)

# Handler pour AWS Lambda
handler = Mangum(app)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
