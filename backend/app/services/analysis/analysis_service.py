from typing import List, Optional, Dict
from uuid import UUID
from ...models.analysis import Analysis, AnalysisCreate, AnalysisStep
from ..ai.bedrock_service import BedrockService
from supabase import Client, create_client
from ...core.config import get_settings

settings = get_settings()

class AnalysisService:
    def __init__(self):
        self.supabase: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )
        self.ai_service = BedrockService()

    async def create_analysis(
        self,
        user_id: UUID,
        analysis: AnalysisCreate
    ) -> Analysis:
        data = {
            "user_id": str(user_id),
            "title": analysis.title,
            "description": analysis.description,
            "status": "draft"
        }
        
        result = self.supabase.table("analysis_projects").insert(data).execute()
        return Analysis(**result.data[0])

    async def get_analysis(self, analysis_id: UUID) -> Optional[Analysis]:
        result = self.supabase.table("analysis_projects")\
            .select("*")\
            .eq("id", str(analysis_id))\
            .execute()
        
        if result.data:
            return Analysis(**result.data[0])
        return None

    async def list_user_analyses(self, user_id: UUID) -> List[Analysis]:
        result = self.supabase.table("analysis_projects")\
            .select("*")\
            .eq("user_id", str(user_id))\
            .execute()
        
        return [Analysis(**item) for item in result.data]

    async def create_analysis_step(
        self,
        analysis_id: UUID,
        step_type: str,
        content: Dict
    ) -> AnalysisStep:
        # Créer l'étape
        step_data = {
            "project_id": str(analysis_id),
            "step_type": step_type,
            "content": content
        }
        
        result = self.supabase.table("analysis_steps").insert(step_data).execute()
        new_step = AnalysisStep(**result.data[0])

        # Obtenir les étapes précédentes pour le contexte
        previous_steps = await self._get_previous_steps(analysis_id)

        # Générer des suggestions IA
        suggestions = await self.ai_service.generate_suggestions(
            context=str(content),
            step_type=step_type,
            previous_steps=previous_steps
        )

        # Mettre à jour l'étape avec les suggestions
        if suggestions:
            self.supabase.table("analysis_steps")\
                .update({"ai_suggestions": [s.dict() for s in suggestions]})\
                .eq("id", str(new_step.id))\
                .execute()
            new_step.ai_suggestions = suggestions

        return new_step

    async def _get_previous_steps(self, analysis_id: UUID) -> Dict:
        result = self.supabase.table("analysis_steps")\
            .select("*")\
            .eq("project_id", str(analysis_id))\
            .execute()
        
        steps_dict = {}
        for step in result.data:
            steps_dict[step["step_type"]] = step["content"]
        
        return steps_dict

    async def update_analysis_status(
        self,
        analysis_id: UUID,
        status: str
    ) -> Analysis:
        result = self.supabase.table("analysis_projects")\
            .update({"status": status})\
            .eq("id", str(analysis_id))\
            .execute()
        
        return Analysis(**result.data[0])
