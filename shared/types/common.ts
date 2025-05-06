export type AnalysisStatus = 'draft' | 'in_progress' | 'completed'
export type StepType = 'context' | 'strategic_issues' | 'objectives' | 'actions'

export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
}

export interface Profile extends BaseEntity {
  email: string
  full_name: string | null
  company_name: string | null
}

export interface AnalysisProject extends BaseEntity {
  user_id: string
  title: string
  description: string | null
  status: AnalysisStatus
}

export interface AnalysisStep extends BaseEntity {
  project_id: string
  step_type: StepType
  content: Record<string, any>
  ai_suggestions?: Record<string, any>
}

export interface AISuggestion {
  content: string
  confidence: number
  context?: string
  metadata?: Record<string, any>
  created_at: string
}
