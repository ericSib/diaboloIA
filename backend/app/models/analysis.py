from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime
from uuid import UUID


class AnalysisBase(BaseModel):
    title: str
    description: Optional[str] = None


class AnalysisCreate(AnalysisBase):
    pass


class Analysis(AnalysisBase):
    id: UUID
    user_id: UUID
    status: str = Field(..., pattern="^(draft|in_progress|completed)$")
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AnalysisStep(BaseModel):
    id: UUID
    project_id: UUID
    step_type: str = Field(..., pattern="^(context|strategic_issues|objectives|actions)$")
    content: Dict
    ai_suggestions: Optional[Dict] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AISuggestion(BaseModel):
    content: str
    confidence: float = Field(..., ge=0, le=1)
    context: Optional[str] = None
    metadata: Optional[Dict] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
