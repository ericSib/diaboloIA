import { z } from 'zod';

// Schémas imbriqués
const contactPersonSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  role: z.string().min(2, "Le rôle doit contenir au moins 2 caractères"),
  email: z.string().email("Format d'email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide")
});

const documentSchema = z.object({
  name: z.string().min(1, "Le nom du document est requis"),
  path: z.string().min(1, "Le chemin du document est requis"),
  size: z.number().optional(),
  type: z.string().optional()
});

// Données statiques pour validation
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

// Schéma principal pour la validation des données d'entreprise
export const companySchema = z.object({
  // Informations générales
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  legalForm: z.enum(legalForms as [string, ...string[]]),
  siren: z.string().regex(/^[0-9]{9}$/, "Le SIREN doit contenir exactement 9 chiffres"),
  creationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),
  sector: z.enum(sectors as [string, ...string[]]),
  size: z.enum(companySizes as [string, ...string[]]),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  
  // Contacts et localisation
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  postalCode: z.string().regex(/^[0-9]{5}$/, "Le code postal doit contenir 5 chiffres"),
  city: z.string().min(1, "La ville est requise"),
  country: z.string().min(1, "Le pays est requis"),
  website: z.string().url("URL invalide").or(z.literal("")),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Format d'email invalide"),
  
  // Présentation détaillée
  history: z.string().min(10, "L'historique doit contenir au moins 10 caractères"),
  mainProducts: z.string().min(10, "Les produits/services principaux doivent contenir au moins 10 caractères"),
  vision: z.string().min(10, "La vision doit contenir au moins 10 caractères"),
  mission: z.string().min(10, "La mission doit contenir au moins 10 caractères"),
  values: z.string().min(10, "Les valeurs doivent contenir au moins 10 caractères"),
  
  // Contacts clés
  keyContacts: z.array(contactPersonSchema).min(1, "Au moins un contact clé est requis"),
  
  // Données financières
  turnover: z.string().min(1, "Le chiffre d'affaires est requis"),
  turnoverYear: z.number().int().min(2000, "L'année doit être valide (2000+)").max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  employees: z.string().min(1, "Le nombre d'employés est requis"),
  profitability: z.enum(profitabilityOptions as [string, ...string[]]),
  
  // Logo et fichiers
  logo: z.string().nullable(),
  documents: z.array(documentSchema)
});

// Type pour TypeScript dérivé du schéma Zod
export type Company = z.infer<typeof companySchema>;

// Export des validateurs individuels pour usage dans des formulaires partiels
export const basicInfoSchema = companySchema.pick({ 
  name: true, 
  legalForm: true, 
  siren: true, 
  creationDate: true, 
  sector: true, 
  size: true, 
  description: true 
});

export const contactInfoSchema = companySchema.pick({ 
  address: true, 
  postalCode: true, 
  city: true, 
  country: true, 
  website: true, 
  phone: true, 
  email: true 
});

export const presentationInfoSchema = companySchema.pick({ 
  history: true, 
  mainProducts: true, 
  vision: true, 
  mission: true, 
  values: true 
});

export const financialInfoSchema = companySchema.pick({ 
  turnover: true, 
  turnoverYear: true, 
  employees: true, 
  profitability: true 
});

// Export des énumérations utilisées pour les options dans l'interface
export const enumValues = {
  sectors,
  companySizes,
  legalForms,
  profitabilityOptions
};
