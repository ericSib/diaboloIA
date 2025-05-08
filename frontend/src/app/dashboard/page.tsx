import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Tableau de bord | Diabolo IA',
  description: 'Accès centralisé à vos analyses stratégiques et projets',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <Button asChild>
          <Link href="/dashboard/projets/nouveau">
            Nouveau projet
          </Link>
        </Button>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Projets actifs
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-3 w-3 text-blue-700">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +2 depuis le dernier mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Analyses complètes
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-3 w-3 text-green-700">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              +1 depuis le dernier mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Entreprises
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-violet-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-3 w-3 text-violet-700">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Aucune nouvelle ce mois-ci
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Suggestions IA
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-3 w-3 text-amber-700">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +4 depuis la semaine dernière
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Projets récents */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Projets récents</CardTitle>
            <CardDescription>
              Vos projets d'analyse stratégique en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Liste des projets (à remplacer par données réelles) */}
              <div className="flex items-center justify-between p-4 rounded-md border">
                <div>
                  <p className="font-medium">Analyse stratégique ABC Corp</p>
                  <p className="text-sm text-muted-foreground">Créé le 3 mai 2025</p>
                </div>
                <Button variant="outline" asChild size="sm">
                  <Link href="/dashboard/projets/1">
                    Voir
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-md border">
                <div>
                  <p className="font-medium">Stratégie Tech Solutions</p>
                  <p className="text-sm text-muted-foreground">Mis à jour il y a 2 jours</p>
                </div>
                <Button variant="outline" asChild size="sm">
                  <Link href="/dashboard/projets/2">
                    Voir
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-md border">
                <div>
                  <p className="font-medium">Plan 2026 - InnoGroup</p>
                  <p className="text-sm text-muted-foreground">Créé le 30 avril 2025</p>
                </div>
                <Button variant="outline" asChild size="sm">
                  <Link href="/dashboard/projets/3">
                    Voir
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activité récente */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Les dernières mises à jour de vos analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex">
                <div className="relative mr-4">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-5 w-5 text-blue-700">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  </div>
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">SWOT complété</p>
                  <p className="text-xs text-muted-foreground">Projet Tech Solutions</p>
                  <p className="text-xs text-muted-foreground">Il y a 3 heures</p>
                </div>
              </div>
              <div className="flex">
                <div className="relative mr-4">
                  <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-5 w-5 text-purple-700">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  </div>
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Analyse Environnement mise à jour</p>
                  <p className="text-xs text-muted-foreground">Projet ABC Corp</p>
                  <p className="text-xs text-muted-foreground">Hier à 14:23</p>
                </div>
              </div>
              <div className="flex">
                <div className="relative mr-4">
                  <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-5 w-5 text-indigo-700">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  </div>
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nouveau projet créé</p>
                  <p className="text-xs text-muted-foreground">Plan 2026 - InnoGroup</p>
                  <p className="text-xs text-muted-foreground">30 avril 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
