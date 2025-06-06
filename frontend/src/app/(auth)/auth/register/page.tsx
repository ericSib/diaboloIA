import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Inscription | Diabolo IA',
  description: 'Créez votre compte pour utiliser Diabolo IA et réaliser vos analyses stratégiques',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Diabolo IA</h1>
        <p className="text-gray-600">Analyse stratégique assistée par intelligence artificielle</p>
      </div>
      <RegisterForm />
    </div>
  );
}
