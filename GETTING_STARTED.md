# Guide de Démarrage - Diabolo IA

Ce guide vous aidera à comprendre la configuration du projet et à démarrer le développement.

## Structure du Projet

Le projet est organisé en monorepo avec la structure suivante :
- `frontend/` : Application Next.js 14 avec App Router et Shadcn/UI
- `backend/` : API FastAPI déployée sur AWS Lambda
- `shared/` : Types et utilitaires partagés entre frontend et backend

## Configuration Initiale

1. **Variables d'Environnement**
   - Consultez `env-configuration.md` pour la liste des variables nécessaires
   - Créez les fichiers `.env.local` (frontend) et `.env` (backend) avec vos valeurs

2. **Installation des Dépendances**

   Frontend :
   ```bash
   cd frontend
   npm install
   ```

   Backend :
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configuration Supabase**
   - Créez un projet sur [Supabase](https://supabase.com/)
   - Activez l'extension pgvector pour les embeddings
   - Configurez les tables selon le modèle Diabolo
   - Configurez l'authentification selon vos besoins

4. **Configuration AWS Bedrock**
   - Configurez l'accès à AWS Bedrock pour Claude
   - Assurez-vous que votre modèle Claude est disponible dans votre région

## Déploiement

### Déploiement Local (Développement)

Frontend :
```bash
cd frontend
npm run dev
```

Backend :
```bash
cd backend
uvicorn app.main:app --reload
```

### Déploiement Production

Le projet est configuré avec GitHub Actions pour le déploiement automatique :
- Le frontend est déployé sur Vercel à chaque push sur la branche main
- Le backend est déployé sur AWS Lambda via Serverless Framework

Pour que le déploiement fonctionne, configurez les secrets GitHub suivants :

**Vercel (Frontend) :**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`

**AWS (Backend) :**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_JWT_SECRET`
- Et toutes les autres variables d'environnement listées dans le workflow GitHub Actions

## Développement

### Ajouter un Nouveau Composant Shadcn/UI

```bash
cd frontend
npx shadcn-ui@latest add button
```

### Architecture Front-end

- Suivez les patterns Next.js avec App Router
- Utilisez des Server Components quand possible
- Placez vos composants client avec `"use client"` dans `/components`
- Organisez les routes selon les fonctionnalités de la méthode Diabolo

### Architecture Back-end

- Suivez l'architecture hexagonale
- Ajoutez de nouveaux endpoints dans `backend/app/api/v1/endpoints/`
- Séparez la logique métier dans `backend/app/services/`

## Prochaines Étapes

1. **Configuration de la base de données Supabase**
   - Définir le schéma complet des tables selon la méthode Diabolo

2. **Intégration complète avec Claude (AWS Bedrock)**
   - Implémenter les prompts spécifiques pour l'analyse stratégique

3. **Compléter les fonctionnalités essentielles**
   - Mettre en place toutes les étapes du processus Diabolo
   - Ajouter les fonctionnalités d'authentification

4. **Tests**
   - Ajouter des tests unitaires pour les fonctions critiques
   - Configurer les tests e2e pour les flux principaux
