# Configuration des Variables d'Environnement

Ce document décrit les variables d'environnement nécessaires pour le fonctionnement de l'application Diabolo IA.

## Variables d'Environnement pour le Frontend (Next.js)

Créez un fichier `.env.local` dans le dossier `frontend/` avec les variables suivantes :

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-supabase
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service-role-supabase

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
# ou en production
# NEXT_PUBLIC_API_URL=https://votre-api-lambda-url.amazonaws.com/dev/api/v1
```

## Variables d'Environnement pour le Backend (FastAPI)

Créez un fichier `.env` dans le dossier `backend/` avec les variables suivantes :

```
# Configuration de base
PROJECT_NAME=Diabolo IA
API_V1_STR=/api/v1
BACKEND_CORS_ORIGINS=["http://localhost:3000", "https://votre-domaine-production.com"]

# Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre-clé-service-role-supabase
SUPABASE_JWT_SECRET=votre-jwt-secret-supabase

# AWS Bedrock (Claude)
AWS_ACCESS_KEY_ID=votre-aws-access-key
AWS_SECRET_ACCESS_KEY=votre-aws-secret-key
AWS_REGION=eu-west-1  # ou votre région préférée
CLAUDE_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0 # ou autre version

# Redis (optionnel pour la mise en cache)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_SSL=False

# Sécurité
SECRET_KEY=une-clé-secrète-très-longue-et-aléatoire-générer-avec-openssl
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Instructions supplémentaires

1. **Ne jamais commiter les fichiers `.env` contenant des informations sensibles**
2. Pour le développement local:
   - Backend: `uvicorn app.main:app --reload --port 8000`
   - Frontend: `npm run dev`
3. Pour la production, ces variables doivent être configurées dans:
   - Vercel (pour le frontend)
   - AWS Lambda (pour le backend)
