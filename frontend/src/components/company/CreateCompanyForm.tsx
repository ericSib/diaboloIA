'use client';

import React, { useState } from 'react';
import { ChevronLeft, Building, Briefcase, FileText, Users, MapPin, Link, Phone, Mail, Upload, HelpCircle, Calendar, ArrowRight, X, BarChart } from 'lucide-react';
import { CompanyFormData } from '@/types/company';

export function CreateCompanyForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CompanyFormData>({
    // Informations générales
    name: '',
    legalForm: '',
    siren: '',
    creationDate: '',
    sector: '',
    size: '',
    description: '',
    
    // Contacts et localisation
    address: '',
    postalCode: '',
    city: '',
    country: 'France',
    website: '',
    phone: '',
    email: '',
    
    // Présentation détaillée
    history: '',
    mainProducts: '',
    vision: '',
    mission: '',
    values: '',
    
    // Contacts clés
    keyContacts: [
      { name: '', role: '', email: '', phone: '' }
    ],
    
    // Données financières
    turnover: '',
    turnoverYear: new Date().getFullYear() - 1,
    employees: '',
    profitability: '',
    
    // Logo et fichiers
    logo: null,
    documents: []
  });
  
  const sectors = [
    "Industrie manufacturière",
    "Services aux entreprises",
    "Commerce de détail",
    "Technologie",
    "Finance et assurance",
    "Santé",
    "Construction / BTP",
    "Transport et logistique",
    "Agroalimentaire",
    "Énergie",
    "Formation professionnelle",
    "Autre"
  ];

  const companySizes = [
    "TPE (< 10 salariés)",
    "PME (10-250 salariés)",
    "ETI (250-5000 salariés)",
    "Grande entreprise (> 5000 salariés)"
  ];
  
  const legalForms = [
    "SARL - Société à responsabilité limitée",
    "SAS - Société par actions simplifiée",
    "SA - Société anonyme",
    "EI - Entreprise individuelle",
    "EURL - Entreprise unipersonnelle à responsabilité limitée",
    "SNC - Société en nom collectif",
    "SCI - Société civile immobilière",
    "Association loi 1901",
    "Autre"
  ];
  
  const profitabilityOptions = [
    "Très rentable (> 15% de marge nette)",
    "Rentable (entre 8% et 15% de marge nette)",
    "Moyennement rentable (entre 3% et 8% de marge nette)",
    "Peu rentable (entre 0% et 3% de marge nette)",
    "Déficitaire (marge nette négative)"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleKeyContactChange = (index: number, field: string, value: string) => {
    const updatedContacts = [...formData.keyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setFormData({ ...formData, keyContacts: updatedContacts });
  };
  
  const addKeyContact = () => {
    setFormData({
      ...formData,
      keyContacts: [...formData.keyContacts, { name: '', role: '', email: '', phone: '' }]
    });
  };
  
  const removeKeyContact = (index: number) => {
    const updatedContacts = [...formData.keyContacts];
    updatedContacts.splice(index, 1);
    setFormData({ ...formData, keyContacts: updatedContacts });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'documents') => {
    if (e.target.files && e.target.files.length > 0) {
      if (field === 'logo') {
        setFormData({ ...formData, logo: e.target.files[0] });
      } else if (field === 'documents') {
        setFormData({ ...formData, documents: [...formData.documents, ...Array.from(e.target.files)] });
      }
    }
  };
  
  const removeDocument = (index: number) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments.splice(index, 1);
    setFormData({ ...formData, documents: updatedDocuments });
  };

  const handleNextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    // Ici viendrait la logique pour soumettre le formulaire et créer l'entreprise
    console.log("Entreprise créée:", formData);
    
    // En production: window.location.href = `/entreprises/${newCompanyId}`;
  };
  
  const navigateBack = () => {
    // Simulation de navigation - à remplacer par votre mécanisme de navigation
    window.history.back();
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.sector && formData.size;
      case 2:
        return formData.address && formData.city && formData.postalCode;
      case 3:
        return true; // Description détaillée optionnelle
      case 4:
        return true; // Au moins un contact existant par défaut
      case 5:
        return true; // Informations financières optionnelles à ce stade
      default:
        return true;
    }
  };

  const getProgressPercentage = () => {
    return ((step - 1) / 4) * 100;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-semibold text-blue-600">Diabolo IA</div>
            <span className="mx-2 text-slate-300">|</span>
            <div className="text-slate-600">Analyse Stratégique</div>
          </div>
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
            E
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-10 max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={navigateBack}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Retour au tableau de bord
        </button>
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Créer une entreprise
          </h1>
          <p className="text-slate-500">
            Enregistrez les informations de l'entreprise pour enrichir votre analyse stratégique
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    s < step 
                      ? 'bg-blue-600 text-white'
                      : s === step
                        ? 'bg-white text-blue-600 border-2 border-blue-600' 
                        : 'bg-white text-slate-400 border border-slate-300'
                  }`}
                >
                  {s < step ? '✓' : s}
                </div>
                <div className={`text-xs ${s <= step ? 'text-blue-600 font-medium' : 'text-slate-500'}`}>
                  {s === 1 && 'Informations'}
                  {s === 2 && 'Contact'}
                  {s === 3 && 'Présentation'}
                  {s === 4 && 'Contacts clés'}
                  {s === 5 && 'Financier'}
                </div>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-slate-200 mt-4 rounded">
            <div 
              className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="space-y-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl text-slate-800 font-medium mb-6 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  Informations générales
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nom de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Acme Inc."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Forme juridique
                  </label>
                  <select
                    name="legalForm"
                    value={formData.legalForm}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Sélectionner une forme juridique</option>
                    {legalForms.map(form => (
                      <option key={form} value={form}>{form}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    N° SIREN (9 chiffres)
                  </label>
                  <input
                    type="text"
                    name="siren"
                    value={formData.siren}
                    onChange={handleInputChange}
                    placeholder="Ex: 123456789"
                    maxLength={9}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date de création
                  </label>
                  <input
                    type="date"
                    name="creationDate"
                    value={formData.creationDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Secteur d'activité <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Sélectionner un secteur</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Taille de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Sélectionner une taille</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description de l'activité
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Décrivez brièvement l'activité principale de l'entreprise..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>
            )}
            
            {/* Step 5: Financial Information */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl text-slate-800 font-medium mb-6 flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-blue-600" />
                  Données financières
                </h2>
                
                <p className="text-slate-600 text-sm mb-4">
                  Ces informations permettent d'enrichir l'analyse des Ressources dans la méthode Diabolo et sont utilisées de façon confidentielle.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Chiffre d'affaires (€)
                    </label>
                    <input
                      type="text"
                      name="turnover"
                      value={formData.turnover}
                      onChange={handleInputChange}
                      placeholder="Ex: 1500000"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Année de référence
                    </label>
                    <input
                      type="number"
                      name="turnoverYear"
                      value={formData.turnoverYear}
                      onChange={handleInputChange}
                      min="2000"
                      max="2030"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-6">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Confidentialité des données</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Ces informations financières sont utilisées uniquement pour l'analyse stratégique et ne sont partagées qu'avec les personnes autorisées dans le cadre de ce projet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="pt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-5 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Précédent
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className={`px-5 py-2 rounded-lg flex items-center ${
                    isStepValid()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-300 text-white cursor-not-allowed'
                  } transition-colors`}
                >
                  Suivant
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Créer l'entreprise
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Helper Text */}
        {step < 5 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <div className="flex">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-500 shrink-0" />
              <div>
                <strong>Conseil :</strong> Les champs marqués d'un astérisque (*) sont obligatoires. 
                Les autres informations peuvent être complétées ultérieurement mais enrichiront 
                l'analyse stratégique selon la méthode Diabolo.
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-sm text-slate-500">© CPA France 2025. Tous droits réservés.</div>
          <div className="text-sm text-slate-500">Version 1.0.0</div>
        </div>
      </footer>
    </>
  );
}

export default CreateCompanyForm;
