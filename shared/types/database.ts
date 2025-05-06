import { AnalysisStatus, StepType } from './common'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: ProfilesTable
      analysis_projects: AnalysisProjectsTable
      analysis_steps: AnalysisStepsTable
      analysis_embeddings: AnalysisEmbeddingsTable
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface ProfilesTable {
  Row: {
    id: string
    email: string
    full_name: string | null
    company_name: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id: string
    email: string
    full_name?: string | null
    company_name?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    email?: string
    full_name?: string | null
    company_name?: string | null
    created_at?: string
    updated_at?: string
  }
}

export interface AnalysisProjectsTable {
  Row: {
    id: string
    user_id: string
    title: string
    description: string | null
    status: AnalysisStatus
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    user_id: string
    title: string
    description?: string | null
    status?: AnalysisStatus
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    user_id?: string
    title?: string
    description?: string | null
    status?: AnalysisStatus
    created_at?: string
    updated_at?: string
  }
}

export interface AnalysisStepsTable {
  Row: {
    id: string
    project_id: string
    step_type: StepType
    content: Json
    ai_suggestions: Json | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    project_id: string
    step_type: StepType
    content: Json
    ai_suggestions?: Json | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    project_id?: string
    step_type?: StepType
    content?: Json
    ai_suggestions?: Json | null
    created_at?: string
    updated_at?: string
  }
}

export interface AnalysisEmbeddingsTable {
  Row: {
    id: string
    content_id: string
    content_type: string
    embedding: number[]
    created_at: string
  }
  Insert: {
    id?: string
    content_id: string
    content_type: string
    embedding: number[]
    created_at?: string
  }
  Update: {
    id?: string
    content_id?: string
    content_type?: string
    embedding?: number[]
    created_at?: string
  }
}
