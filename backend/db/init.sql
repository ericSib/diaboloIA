-- Script d'initialisation de la base de données Supabase pour Diabolo IA

-- Activer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- Pour la génération d'UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- Pour les fonctions cryptographiques
CREATE EXTENSION IF NOT EXISTS "vector";         -- Pour les embeddings vectoriels (pgvector)

-- Configuration du schéma public pour RLS (Row Level Security)
ALTER SCHEMA public REPLICA IDENTITY FULL;  -- Pour le suivi des modifications

-- Activer Supabase Auth pour l'authentification
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA extensions;

-- Fonction d'aide pour mettre à jour les horodatages
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."Updated_At" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour synchroniser les utilisateurs Auth avec la table Utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."Utilisateur" (
    "ID_Utilisateur", 
    "Email", 
    "Nom", 
    "Prénom", 
    "Rôle"
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nom', 'Non spécifié'),
    COALESCE(NEW.raw_user_meta_data->>'prenom', 'Non spécifié'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'Utilisateur')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Configuration des déclencheurs pour les tables avec horodatage
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    AND table_name IN ('Utilisateur', 'Entreprise')
  LOOP
    EXECUTE format('
      CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON public.%I
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_updated_at();
    ', t);
  END LOOP;
END
$$;

-- Déclencher la création d'utilisateurs après inscription via Supabase Auth
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Configuration RLS globale
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO authenticated;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
