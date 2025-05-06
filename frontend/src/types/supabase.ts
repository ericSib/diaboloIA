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
      profiles: {
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
      analysis_projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'draft' | 'in_progress' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: 'draft' | 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: 'draft' | 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      analysis_steps: {
        Row: {
          id: string
          project_id: string
          step_type: 'context' | 'strategic_issues' | 'objectives' | 'actions'
          content: Json
          ai_suggestions: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          step_type: 'context' | 'strategic_issues' | 'objectives' | 'actions'
          content: Json
          ai_suggestions?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          step_type?: 'context' | 'strategic_issues' | 'objectives' | 'actions'
          content?: Json
          ai_suggestions?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      analysis_embeddings: {
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
