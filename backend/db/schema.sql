-- Création du schéma de base de données Diabolo IA pour Supabase

-- Tables principales
CREATE TABLE "Utilisateur" (
  "ID_Utilisateur" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "Nom" TEXT NOT NULL,
  "Prénom" TEXT NOT NULL,
  "Email" TEXT UNIQUE NOT NULL,
  "Rôle" TEXT NOT NULL CHECK (Rôle IN ('Admin', 'Dirigeant', 'Consultant', 'Utilisateur')),
  "Date_Dernière_Connexion" TIMESTAMP WITH TIME ZONE,
  "Created_At" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Updated_At" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Entreprise" (
  "ID_Entreprise" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "Nom" TEXT NOT NULL,
  "Secteur" TEXT NOT NULL,
  "Taille" TEXT CHECK (Taille IN ('TPE', 'PME', 'ETI', 'GE')),
  "Type" TEXT CHECK (Type IN ('SA', 'SARL', 'SAS', 'EURL', 'Association', 'Autre')),
  "Description" TEXT,
  "Logo" TEXT,
  "Données_Financières_Clés" JSONB,
  "Created_At" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Updated_At" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Projet" (
  "ID_Projet" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "Nom_Projet" TEXT NOT NULL,
  "Description" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Date_Dernière_Modification" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Statut" TEXT CHECK (Statut IN ('En cours', 'Terminé', 'Archivé', 'En pause')),
  "ID_Entreprise" UUID REFERENCES "Entreprise"("ID_Entreprise") ON DELETE CASCADE,
  "Created_By" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Tables d'analyse VER (Volontés, Environnement, Ressources)

-- Volontés
CREATE TABLE "Analyse_Volontés" (
  "ID_Analyse_Volontés" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "ID_Entreprise" UUID REFERENCES "Entreprise"("ID_Entreprise"),
  "Identité" TEXT,
  "Histoire" TEXT,
  "Métier" TEXT,
  "Valeurs" TEXT,
  "Volontés_Dirigeants" TEXT,
  "Volontés_Actionnaires" TEXT,
  "Hiérarchie_Volontés" TEXT,
  "Source_Information" TEXT,
  "Date_Analyse" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Environnement
CREATE TABLE "Analyse_PESTEL" (
  "ID_PESTEL" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Politique" TEXT,
  "Economique" TEXT,
  "Sociologique" TEXT,
  "Technologique" TEXT,
  "Ecologique" TEXT,
  "Légal" TEXT,
  "Synthèse_PESTEL" TEXT,
  "Source_Information" TEXT,
  "Date_Analyse" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

CREATE TABLE "Analyse_FCS" (
  "ID_FCS" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Description_FCS" TEXT NOT NULL,
  "Est_Facteur_Différenciant" BOOLEAN DEFAULT false,
  "Importance" INTEGER CHECK (Importance BETWEEN 1 AND 5),
  "Atouts_Entreprise" INTEGER CHECK (Atouts_Entreprise BETWEEN 1 AND 5),
  "Commentaire" TEXT,
  "Source_Information" TEXT,
  "Date_Analyse" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

CREATE TABLE "Analyse_Forces_Porter" (
  "ID_Porter" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Intensité_Concurrentielle" INTEGER CHECK (Intensité_Concurrentielle BETWEEN 1 AND 5),
  "Pouvoir_Négociation_Clients" INTEGER CHECK (Pouvoir_Négociation_Clients BETWEEN 1 AND 5),
  "Pouvoir_Négociation_Fournisseurs" INTEGER CHECK (Pouvoir_Négociation_Fournisseurs BETWEEN 1 AND 5),
  "Menace_Nouveaux_Entrants" INTEGER CHECK (Menace_Nouveaux_Entrants BETWEEN 1 AND 5),
  "Menace_Produits_Substitution" INTEGER CHECK (Menace_Produits_Substitution BETWEEN 1 AND 5),
  "Commentaires" TEXT,
  "Recommandations" TEXT,
  "Date_Analyse" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Ressources
CREATE TABLE "Chaîne_Valeur" (
  "ID_Chaîne_Valeur" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Entreprise" UUID REFERENCES "Entreprise"("ID_Entreprise"),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Infrastructure" TEXT,
  "Ressources_Humaines" TEXT,
  "Développement_Technologique" TEXT,
  "Approvisionnement" TEXT,
  "Logistique_Interne" TEXT,
  "Production" TEXT,
  "Logistique_Externe" TEXT,
  "Marketing_Ventes" TEXT,
  "Services" TEXT,
  "Marge" TEXT,
  "Forces_Identifiées" TEXT,
  "Faiblesses_Identifiées" TEXT,
  "Date_Analyse" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

CREATE TABLE "Ressources_Financières" (
  "ID_Ressources_Financières" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "ID_Entreprise" UUID REFERENCES "Entreprise"("ID_Entreprise"),
  "Chiffre_Affaires" NUMERIC,
  "Résultat_Net" NUMERIC,
  "Fonds_Propres" NUMERIC,
  "Dettes_MLT" NUMERIC,
  "Immobilisations_Nettes" NUMERIC,
  "Trésorerie" NUMERIC,
  "CAF" NUMERIC,
  "Ratios_Clés" JSONB,
  "Evolution_3_Ans" TEXT,
  "Commentaire" TEXT,
  "Date_Analyse" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Tables d'analyse stratégique 
CREATE TABLE "Segmentation" (
  "ID_Segmentation" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Nom_Segment" TEXT NOT NULL,
  "Description" TEXT,
  "Critères_Utilisés" TEXT,
  "FCS_Associés" TEXT,
  "Taille_Estimée" TEXT,
  "Potentiel_Croissance" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

CREATE TABLE "SWOT" (
  "ID_SWOT" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Forces" TEXT,
  "Faiblesses" TEXT,
  "Opportunités" TEXT,
  "Menaces" TEXT,
  "Synthèse_Générale" TEXT,
  "FCS_Associés" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur"),
  "IA_Suggestions" TEXT
);

CREATE TABLE "TOWS" (
  "ID_TOWS" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Stratégies_SO" TEXT,
  "Stratégies_ST" TEXT,
  "Stratégies_WO" TEXT,
  "Stratégies_WT" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur"),
  "IA_Suggestions" TEXT
);

-- Tables de formulation stratégique
CREATE TABLE "Cahier_Problématique" (
  "ID_Cahier_Problématique" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Cahier_Des_Charges" TEXT,
  "Problématique_Principale" TEXT,
  "Défis_Secondaires" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur"),
  "IA_Suggestions" TEXT
);

CREATE TABLE "Vision_Mission" (
  "ID_Vision_Mission" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Vision" TEXT,
  "Mission" TEXT,
  "Métier_Actuel" TEXT,
  "Métier_Futur" TEXT,
  "Place_Marché" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur"),
  "IA_Suggestions" TEXT
);

CREATE TABLE "Dessein_Stratégique" (
  "ID_Dessein" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Description_Générale" TEXT,
  "Horizon_Temporel" TEXT,
  "Volet_Offensif" TEXT,
  "Volet_Défensif" TEXT,
  "Stratégie_Veille" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur"),
  "IA_Suggestions" TEXT
);

CREATE TABLE "Business_Model_Canvas" (
  "ID_BM_Canvas" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Type" TEXT CHECK (Type IN ('Actuel', 'Futur', 'Concurrent')),
  "Segments_Clientèle" TEXT,
  "Proposition_Valeur" TEXT,
  "Canaux" TEXT,
  "Relations_Clients" TEXT,
  "Sources_Revenus" TEXT,
  "Ressources_Clés" TEXT,
  "Activités_Clés" TEXT,
  "Partenaires_Clés" TEXT, 
  "Structure_Coûts" TEXT,
  "Aspects_RSE" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Tables de mise en oeuvre
CREATE TABLE "Plan_Action" (
  "ID_Plan" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Type" TEXT CHECK (Type IN ('Offensif', 'Défensif', 'Veille')),
  "Objectif" TEXT NOT NULL,
  "Description_Action" TEXT,
  "Responsable" TEXT,
  "Date_Début" TIMESTAMP WITH TIME ZONE,
  "Date_Fin" TIMESTAMP WITH TIME ZONE,
  "Statut" TEXT CHECK (Statut IN ('À faire', 'En cours', 'Terminé', 'En retard')),
  "Priorité" INTEGER CHECK (Priorité BETWEEN 1 AND 3),
  "Ressources_Requises" TEXT,
  "KPIs_Associés" TEXT,
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

CREATE TABLE "KPI" (
  "ID_KPI" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "ID_Plan" UUID REFERENCES "Plan_Action"("ID_Plan") ON DELETE SET NULL,
  "Nom_Indicateur" TEXT NOT NULL,
  "Description" TEXT,
  "Perspective_BSC" TEXT CHECK (Perspective_BSC IN ('Financière', 'Client', 'Processus Interne', 'Apprentissage')),
  "Valeur_Cible" NUMERIC,
  "Valeur_Actuelle" NUMERIC,
  "Unité" TEXT,
  "Fréquence_Mesure" TEXT CHECK (Fréquence_Mesure IN ('Journalier', 'Hebdomadaire', 'Mensuel', 'Trimestriel', 'Annuel')),
  "Date_Dernière_Mesure" TIMESTAMP WITH TIME ZONE,
  "Tendance" TEXT CHECK (Tendance IN ('En hausse', 'Stable', 'En baisse')),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Tables de support
CREATE TABLE "Document" (
  "ID_Document" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Type_Document" TEXT CHECK (Type_Document IN ('Rapport', 'Présentation', 'Tableau', 'Image', 'Autre')),
  "Nom_Document" TEXT NOT NULL,
  "URL_Document" TEXT,
  "Etape_Associée" TEXT,
  "Date_Import" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Importé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

CREATE TABLE "Frein_Transformation" (
  "ID_Frein" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Description_Frein" TEXT NOT NULL,
  "Catégorie" TEXT CHECK (Catégorie IN ('Culturel', 'Structurel', 'Financier', 'Technologique', 'Humain')),
  "Niveau_Impact" INTEGER CHECK (Niveau_Impact BETWEEN 1 AND 5),
  "Solutions_Proposées" TEXT,
  "Date_Identification" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Création des RLS (Row Level Security) pour sécuriser l'accès aux données
ALTER TABLE "Projet" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analyse_Volontés" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analyse_PESTEL" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analyse_FCS" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analyse_Forces_Porter" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SWOT" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "Accès utilisateurs aux projets" ON "Projet"
  FOR ALL USING (
    auth.uid() = "Created_By" OR 
    EXISTS (
      SELECT 1 FROM "Utilisateur" u
      WHERE u."ID_Utilisateur" = auth.uid() AND u."Rôle" = 'Admin'
    )
  );

-- Créer des indexes pour optimiser les performances des requêtes
CREATE INDEX idx_projet_entreprise ON "Projet"("ID_Entreprise");
CREATE INDEX idx_analyse_volontes_projet ON "Analyse_Volontés"("ID_Projet");
CREATE INDEX idx_analyse_pestel_projet ON "Analyse_PESTEL"("ID_Projet");
CREATE INDEX idx_swot_projet ON "SWOT"("ID_Projet");
CREATE INDEX idx_plan_action_projet ON "Plan_Action"("ID_Projet");

-- Créer des déclencheurs pour mettre à jour les dates de modification
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."Date_Dernière_Modification" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projet_modtime
BEFORE UPDATE ON "Projet"
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Créer une vue pour faciliter les requêtes courantes
CREATE VIEW vue_projets_avec_analyses AS
SELECT 
  p."ID_Projet", 
  p."Nom_Projet", 
  p."Statut",
  e."Nom" AS "Nom_Entreprise",
  av."ID_Analyse_Volontés",
  ap."ID_PESTEL",
  s."ID_SWOT",
  d."ID_Dessein"
FROM "Projet" p
LEFT JOIN "Entreprise" e ON p."ID_Entreprise" = e."ID_Entreprise"
LEFT JOIN "Analyse_Volontés" av ON p."ID_Projet" = av."ID_Projet"
LEFT JOIN "Analyse_PESTEL" ap ON p."ID_Projet" = ap."ID_Projet"
LEFT JOIN "SWOT" s ON p."ID_Projet" = s."ID_Projet"
LEFT JOIN "Dessein_Stratégique" d ON p."ID_Projet" = d."ID_Projet";

-- Ajout de l'extension pgvector pour les embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Table pour stocker les embeddings des analyses
CREATE TABLE "Embedding_Analyse" (
  "ID_Embedding" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ID_Projet" UUID REFERENCES "Projet"("ID_Projet") ON DELETE CASCADE,
  "Type_Analyse" TEXT NOT NULL,
  "ID_Analyse" UUID NOT NULL,
  "Contenu_Analyse" TEXT,
  "Embedding" vector(1536),  -- Dimension pour Claude embeddings
  "Date_Création" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "Créé_Par" UUID REFERENCES "Utilisateur"("ID_Utilisateur")
);

-- Index pour recherche par similarité
CREATE INDEX idx_embeddings ON "Embedding_Analyse" USING ivfflat (embedding vector_cosine_ops);
