"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  basicInfoSchema, 
  contactInfoSchema, 
  presentationInfoSchema, 
  financialInfoSchema,
  companySchema, 
  type Company
} from '@/shared/schemas/company';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// Étapes du formulaire avec leur schéma de validation respectif
const formSchemas = {
  1: basicInfoSchema,
  2: contactInfoSchema,
  3: presentationInfoSchema,
  4: financialInfoSchema
};

export function useCompanyForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Company>>({});
  
  // Créer un form pour l'étape actuelle
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<Partial<Company>>({
    resolver: zodResolver(formSchemas[step as keyof typeof formSchemas]),
    defaultValues: formData
  });

  // Fonction pour passer à l'étape suivante
  const goToNextStep = (data: Partial<Company>) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Si nous sommes à la dernière étape, soumettre le formulaire
      createCompanyMutation.mutate(data as Company);
    }
  };

  // Fonction pour revenir à l'étape précédente
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Gestion de l'upload de logo
  const handleLogoUpload = async (file: File): Promise<string | null> => {
    try {
      const filename = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('logos')
        .upload(filename, file);
        
      if (error) throw error;
      
      // Construire l'URL publique
      return data?.path || null;
    } catch (error) {
      console.error('Erreur lors de l\'upload du logo:', error);
      toast.error('Erreur lors de l\'upload du logo');
      return null;
    }
  };

  // Gestion de l'upload de documents
  const handleDocumentUpload = async (file: File): Promise<{name: string, path: string, size: number, type: string} | null> => {
    try {
      const filename = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filename, file);
        
      if (error) throw error;
      
      return {
        name: file.name,
        path: data?.path || '',
        size: file.size,
        type: file.type
      };
    } catch (error) {
      console.error('Erreur lors de l\'upload du document:', error);
      toast.error('Erreur lors de l\'upload du document');
      return null;
    }
  };

  // Mutation pour créer l'entreprise
  const createCompanyMutation = useMutation({
    mutationFn: async (data: Company) => {
      // Upload du logo si présent
      let logoPath = null;
      if (data.logo && typeof data.logo === 'object') {
        logoPath = await handleLogoUpload(data.logo as unknown as File);
      }

      // Préparer les données finales
      const finalData = {
        ...data,
        logo: logoPath,
        created_at: new Date().toISOString()
      };

      // Insérer dans Supabase
      const { data: result, error } = await supabase
        .from('companies')
        .insert(finalData)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: (data) => {
      toast.success('Entreprise créée avec succès');
      // Réinitialiser le formulaire
      reset();
      setFormData({});
      setStep(1);
      // Ici vous pouvez ajouter une redirection si nécessaire
    },
    onError: (error) => {
      console.error('Erreur lors de la création de l\'entreprise:', error);
      toast.error('Erreur lors de la création de l\'entreprise');
    }
  });

  return {
    step,
    formData,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
    setValue,
    goToNextStep,
    goToPreviousStep,
    handleLogoUpload,
    handleDocumentUpload,
    createCompanyMutation
  };
}
