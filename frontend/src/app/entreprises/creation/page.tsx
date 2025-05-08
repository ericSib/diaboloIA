import { Metadata } from 'next';
import CreateCompanyPage from '@/components/entreprises/CreateCompanyPage';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Création d\'entreprise - Diabolo IA',
  description: 'Enregistrez les informations de votre entreprise pour l\'analyse stratégique avec la méthode Diabolo',
  keywords: 'création entreprise, analyse stratégique, diabolo, CPA France',
};

export default function CreateCompanyPageWrapper() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
      <CreateCompanyPage />
    </Suspense>
  );
}
