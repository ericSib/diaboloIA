"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Building, Briefcase, FileText, Users, MapPin, Link, Phone, Mail, Upload, HelpCircle, Calendar, ArrowRight, X, BarChart } from 'lucide-react';
import { useCompanyForm } from '@/hooks/useCompanyForm';
import { enumValues } from '@/shared/schemas/company';

// Composants UI de Shadcn
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Progress } from '@/components/ui/Progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Alert, AlertDescription } from '@/components/ui/Alert';

// Composant principal
const CreateCompanyPageWithHookForm: React.FC = () => {
  const router = useRouter();
  const {
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
    createCompanyMutation
  } = useCompanyForm();

  // Calcul du progrès en pourcentage
  const progressPercentage = (step / 4) * 100;

  // Fonction pour gérer l'envoi du formulaire à chaque étape
  const onSubmit = (data: any) => {
    goToNextStep(data);
  };

  // Rendu du contenu en fonction de l'étape actuelle
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Informations générales
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nom de l'entreprise *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Diabolo Technologies"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="legalForm">Forme juridique *</Label>
                <Select
                  onValueChange={(value) => setValue('legalForm', value)}
                  defaultValue={watch('legalForm')}
                >
                  <SelectTrigger className={errors.legalForm ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez une forme juridique" />
                  </SelectTrigger>
                  <SelectContent>
                    {enumValues.legalForms.map((form) => (
                      <SelectItem key={form} value={form}>
                        {form}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.legalForm && (
                  <p className="text-sm text-red-500 mt-1">{errors.legalForm.message as string}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="siren">Numéro SIREN (9 chiffres) *</Label>
                <Input
                  id="siren"
                  placeholder="Ex: 123456789"
                  {...register('siren')}
                  className={errors.siren ? 'border-red-500' : ''}
                />
                {errors.siren && (
                  <p className="text-sm text-red-500 mt-1">{errors.siren.message as string}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="creationDate">Date de création *</Label>
                <Input
                  id="creationDate"
                  type="date"
                  {...register('creationDate')}
                  className={errors.creationDate ? 'border-red-500' : ''}
                />
                {errors.creationDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.creationDate.message as string}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="sector">Secteur d'activité *</Label>
                <Select
                  onValueChange={(value) => setValue('sector', value)}
                  defaultValue={watch('sector')}
                >
                  <SelectTrigger className={errors.sector ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {enumValues.sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sector && (
                  <p className="text-sm text-red-500 mt-1">{errors.sector.message as string}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="size">Taille de l'entreprise *</Label>
                <Select
                  onValueChange={(value) => setValue('size', value)}
                  defaultValue={watch('size')}
                >
                  <SelectTrigger className={errors.size ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez une taille" />
                  </SelectTrigger>
                  <SelectContent>
                    {enumValues.companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.size && (
                  <p className="text-sm text-red-500 mt-1">{errors.size.message as string}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="description">Description de l'entreprise *</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez brièvement l'activité de l'entreprise..."
                  {...register('description')}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message as string}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      // Les autres étapes seraient implémentées de façon similaire
      // case 2, case 3, case 4
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* En-tête avec navigation et titre */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/entreprises')}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Création d'une entreprise</h1>
      </div>
      
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-1">
          <span>Étape {step} sur 4</span>
          <span>{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} />
      </div>
      
      {/* Notification de création en cours */}
      {createCompanyMutation.isPending && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertDescription>
            Création de l'entreprise en cours...
          </AlertDescription>
        </Alert>
      )}
      
      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Informations générales'}
            {step === 2 && 'Contact et localisation'}
            {step === 3 && 'Présentation détaillée'}
            {step === 4 && 'Données financières'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Renseignez les informations de base de l\'entreprise'}
            {step === 2 && 'Ajoutez les coordonnées et l\'adresse de l\'entreprise'}
            {step === 3 && 'Décrivez l\'entreprise, son histoire et ses valeurs'}
            {step === 4 && 'Complétez avec les données financières'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={goToPreviousStep}
                >
                  Précédent
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {step < 4 ? 'Suivant' : 'Créer l\'entreprise'}
                {step < 4 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCompanyPageWithHookForm;
