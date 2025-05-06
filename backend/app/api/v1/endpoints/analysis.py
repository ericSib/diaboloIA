from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID
from ....models.analysis import Analysis, AnalysisCreate, AnalysisStep
from ....services.analysis.analysis_service import AnalysisService
from ....core.security import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()

def get_analysis_service():
    return AnalysisService()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials"
        )
    return UUID(payload.get("sub"))

@router.post("/", response_model=Analysis)
async def create_analysis(
    analysis: AnalysisCreate,
    current_user: UUID = Depends(get_current_user),
    service: AnalysisService = Depends(get_analysis_service)
):
    """
    Créer une nouvelle analyse Diabolo
    """
    return await service.create_analysis(current_user, analysis)

@router.get("/", response_model=List[Analysis])
async def list_analyses(
    current_user: UUID = Depends(get_current_user),
    service: AnalysisService = Depends(get_analysis_service)
):
    """
    Lister toutes les analyses de l'utilisateur
    """
    return await service.list_user_analyses(current_user)

@router.get("/{analysis_id}", response_model=Analysis)
async def get_analysis(
    analysis_id: UUID,
    current_user: UUID = Depends(get_current_user),
    service: AnalysisService = Depends(get_analysis_service)
):
    """
    Récupérer une analyse spécifique
    """
    analysis = await service.get_analysis(analysis_id)
    if analysis is None:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis

@router.post("/{analysis_id}/steps", response_model=AnalysisStep)
async def create_step(
    analysis_id: UUID,
    step_type: str,
    content: dict,
    current_user: UUID = Depends(get_current_user),
    service: AnalysisService = Depends(get_analysis_service)
):
    """
    Créer une nouvelle étape dans l'analyse avec suggestions IA
    """
    # Vérifier que l'analyse existe et appartient à l'utilisateur
    analysis = await service.get_analysis(analysis_id)
    if analysis is None or analysis.user_id != current_user:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return await service.create_analysis_step(analysis_id, step_type, content)

@router.put("/{analysis_id}/status", response_model=Analysis)
async def update_status(
    analysis_id: UUID,
    status: str,
    current_user: UUID = Depends(get_current_user),
    service: AnalysisService = Depends(get_analysis_service)
):
    """
    Mettre à jour le statut d'une analyse
    """
    analysis = await service.get_analysis(analysis_id)
    if analysis is None or analysis.user_id != current_user:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return await service.update_analysis_status(analysis_id, status)
