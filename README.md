# Diabolo IA

Application d'analyse stratégique basée sur la méthode Diabolo du CPA France, aidant les dirigeants d'entreprise à réaliser des analyses structurées, enrichies par des suggestions d'IA.

## Structure du Monorepo

Ce repository est organisé en monorepo avec les composants suivants :

```
diabolo-ia/
├── frontend/        # Application Next.js 14 avec App Router
├── backend/         # API FastAPI déployée sur AWS Lambda
└── shared/          # Types et utilitaires partagés entre frontend et backend
```

## Architecture Technique

### Frontend
- **Framework** : Next.js 14 avec App Router
- **UI** : Shadcn/UI + Tailwind CSS
- **État** : React Context + Hooks
- **Authentification** : Supabase Auth
- **Déploiement** : Vercel

### Backend
- **Framework** : FastAPI (Python)
- **Architecture** : Hexagonale
- **Déploiement** : AWS Lambda via Serverless Framework
- **Intégration IA** : AWS Bedrock (Claude)

### Base de données
- **Plateforme** : Supabase
- **Extensions** : pgvector pour les embeddings vectoriels

## Développement

### Prérequis
- Node.js 18+
- Python 3.9+
- Compte Supabase
- Accès AWS Bedrock

### Installation

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Déploiement

Le CI/CD est configuré via GitHub Actions avec des workflows séparés pour :
- Déploiement du frontend sur Vercel
- Déploiement du backend sur AWS Lambda

## Contribution

Merci de suivre les standards de code définis dans les guidelines du projet.