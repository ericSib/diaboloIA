/**
 * Types TypeScript pour le schéma de base de données Diabolo IA
 * Générés manuellement à partir du schéma SQL
 */

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
      Utilisateur: UtilisateurTable
      Entreprise: EntrepriseTable
      Projet: ProjetTable
      Analyse_Volontés: AnalyseVolontésTable
      Analyse_PESTEL: AnalysePESTELTable
      Analyse_FCS: AnalyseFCSTable
      Analyse_Forces_Porter: AnalyseForcesPorterTable
      Chaîne_Valeur: ChaîneValeurTable
      Ressources_Financières: RessourcesFinancièresTable
      Segmentation: SegmentationTable
      SWOT: SWOTTable
      TOWS: TOWSTable
      Cahier_Problématique: CahierProblématiqueTable
      Vision_Mission: VisionMissionTable
      Dessein_Stratégique: DesseinStratégiqueTable
      Business_Model_Canvas: BusinessModelCanvasTable
      Plan_Action: PlanActionTable
      KPI: KPITable
      Document: DocumentTable
      Frein_Transformation: FreinTransformationTable
      Embedding_Analyse: EmbeddingAnalyseTable
    }
    Views: {
      vue_projets_avec_analyses: {
        Row: {
          ID_Projet: string
          Nom_Projet: string
          Statut: string
          Nom_Entreprise: string
          ID_Analyse_Volontés: string | null
          ID_PESTEL: string | null
          ID_SWOT: string | null
          ID_Dessein: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Tables principales

export interface UtilisateurTable {
  Row: {
    ID_Utilisateur: string
    Nom: string
    Prénom: string
    Email: string
    Rôle: 'Admin' | 'Dirigeant' | 'Consultant' | 'Utilisateur'
    Date_Dernière_Connexion: string | null
    Created_At: string
    Updated_At: string
  }
  Insert: {
    ID_Utilisateur?: string
    Nom: string
    Prénom: string
    Email: string
    Rôle: 'Admin' | 'Dirigeant' | 'Consultant' | 'Utilisateur'
    Date_Dernière_Connexion?: string | null
    Created_At?: string
    Updated_At?: string
  }
  Update: {
    ID_Utilisateur?: string
    Nom?: string
    Prénom?: string
    Email?: string
    Rôle?: 'Admin' | 'Dirigeant' | 'Consultant' | 'Utilisateur'
    Date_Dernière_Connexion?: string | null
    Created_At?: string
    Updated_At?: string
  }
}

export interface EntrepriseTable {
  Row: {
    ID_Entreprise: string
    Nom: string
    Secteur: string
    Taille: 'TPE' | 'PME' | 'ETI' | 'GE' | null
    Type: 'SA' | 'SARL' | 'SAS' | 'EURL' | 'Association' | 'Autre' | null
    Description: string | null
    Logo: string | null
    Données_Financières_Clés: Json | null
    Created_At: string
    Updated_At: string
  }
  Insert: {
    ID_Entreprise?: string
    Nom: string
    Secteur: string
    Taille?: 'TPE' | 'PME' | 'ETI' | 'GE' | null
    Type?: 'SA' | 'SARL' | 'SAS' | 'EURL' | 'Association' | 'Autre' | null
    Description?: string | null
    Logo?: string | null
    Données_Financières_Clés?: Json | null
    Created_At?: string
    Updated_At?: string
  }
  Update: {
    ID_Entreprise?: string
    Nom?: string
    Secteur?: string
    Taille?: 'TPE' | 'PME' | 'ETI' | 'GE' | null
    Type?: 'SA' | 'SARL' | 'SAS' | 'EURL' | 'Association' | 'Autre' | null
    Description?: string | null
    Logo?: string | null
    Données_Financières_Clés?: Json | null
    Created_At?: string
    Updated_At?: string
  }
}

export interface ProjetTable {
  Row: {
    ID_Projet: string
    Nom_Projet: string
    Description: string | null
    Date_Création: string
    Date_Dernière_Modification: string
    Statut: 'En cours' | 'Terminé' | 'Archivé' | 'En pause'
    ID_Entreprise: string
    Created_By: string
  }
  Insert: {
    ID_Projet?: string
    Nom_Projet: string
    Description?: string | null
    Date_Création?: string
    Date_Dernière_Modification?: string
    Statut?: 'En cours' | 'Terminé' | 'Archivé' | 'En pause'
    ID_Entreprise: string
    Created_By: string
  }
  Update: {
    ID_Projet?: string
    Nom_Projet?: string
    Description?: string | null
    Date_Création?: string
    Date_Dernière_Modification?: string
    Statut?: 'En cours' | 'Terminé' | 'Archivé' | 'En pause'
    ID_Entreprise?: string
    Created_By?: string
  }
}

// Définir les principales tables d'analyse

export interface AnalyseVolontésTable {
  Row: {
    ID_Analyse_Volontés: string
    ID_Projet: string
    ID_Entreprise: string | null
    Identité: string | null
    Histoire: string | null
    Métier: string | null
    Valeurs: string | null
    Volontés_Dirigeants: string | null
    Volontés_Actionnaires: string | null
    Hiérarchie_Volontés: string | null
    Source_Information: string | null
    Date_Analyse: string
    Créé_Par: string
  }
  Insert: {
    ID_Analyse_Volontés?: string
    ID_Projet: string
    ID_Entreprise?: string | null
    Identité?: string | null
    Histoire?: string | null
    Métier?: string | null
    Valeurs?: string | null
    Volontés_Dirigeants?: string | null
    Volontés_Actionnaires?: string | null
    Hiérarchie_Volontés?: string | null
    Source_Information?: string | null
    Date_Analyse?: string
    Créé_Par: string
  }
  Update: {
    ID_Analyse_Volontés?: string
    ID_Projet?: string
    ID_Entreprise?: string | null
    Identité?: string | null
    Histoire?: string | null
    Métier?: string | null
    Valeurs?: string | null
    Volontés_Dirigeants?: string | null
    Volontés_Actionnaires?: string | null
    Hiérarchie_Volontés?: string | null
    Source_Information?: string | null
    Date_Analyse?: string
    Créé_Par?: string
  }
}

export interface SWOTTable {
  Row: {
    ID_SWOT: string
    ID_Projet: string
    Forces: string | null
    Faiblesses: string | null
    Opportunités: string | null
    Menaces: string | null
    Synthèse_Générale: string | null
    FCS_Associés: string | null
    Date_Création: string
    Créé_Par: string
    IA_Suggestions: string | null
  }
  Insert: {
    ID_SWOT?: string
    ID_Projet: string
    Forces?: string | null
    Faiblesses?: string | null
    Opportunités?: string | null
    Menaces?: string | null
    Synthèse_Générale?: string | null
    FCS_Associés?: string | null
    Date_Création?: string
    Créé_Par: string
    IA_Suggestions?: string | null
  }
  Update: {
    ID_SWOT?: string
    ID_Projet?: string
    Forces?: string | null
    Faiblesses?: string | null
    Opportunités?: string | null
    Menaces?: string | null
    Synthèse_Générale?: string | null
    FCS_Associés?: string | null
    Date_Création?: string
    Créé_Par?: string
    IA_Suggestions?: string | null
  }
}

export interface EmbeddingAnalyseTable {
  Row: {
    ID_Embedding: string
    ID_Projet: string
    Type_Analyse: string
    ID_Analyse: string
    Contenu_Analyse: string | null
    Embedding: number[]
    Date_Création: string
    Créé_Par: string
  }
  Insert: {
    ID_Embedding?: string
    ID_Projet: string
    Type_Analyse: string
    ID_Analyse: string
    Contenu_Analyse?: string | null
    Embedding: number[]
    Date_Création?: string
    Créé_Par: string
  }
  Update: {
    ID_Embedding?: string
    ID_Projet?: string
    Type_Analyse?: string
    ID_Analyse?: string
    Contenu_Analyse?: string | null
    Embedding?: number[]
    Date_Création?: string
    Créé_Par?: string
  }
}

// Note: Ce fichier contient uniquement les tables principales et quelques tables d'analyse
// Pour générer les types complets, vous pouvez utiliser l'outil Supabase CLI une fois
// votre base de données configurée, ou compléter ce fichier avec les tables manquantes
