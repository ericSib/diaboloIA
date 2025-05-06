export interface Profile {
  id: string
  email: string
  fullName: string
  companyName: string
  createdAt: string
  updatedAt: string
}

export interface AnalysisProject {
  id: string
  userId: string
  title: string
  description?: string
  status: 'draft' | 'in_progress' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface AnalysisStep {
  id: string
  projectId: string
  stepType: 'context' | 'strategic_issues' | 'objectives' | 'actions'
  content: Record<string, any>
  aiSuggestions?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface AISuggestion {
  content: string
  confidence: number
  context?: string
  createdAt: string
}
