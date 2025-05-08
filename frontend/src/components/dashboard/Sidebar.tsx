'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  LayoutDashboard, 
  Users, 
  Building, 
  FileText,
  Menu, 
  X
} from 'lucide-react';

const sidebarLinks = [
  {
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Projets',
    href: '/dashboard/projets',
    icon: FileText
  },
  {
    name: 'Analyses',
    href: '/dashboard/analyses',
    icon: BarChart3
  },
  {
    name: 'Entreprises',
    href: '/dashboard/entreprises',
    icon: Building
  },
  {
    name: 'Utilisateurs',
    href: '/dashboard/utilisateurs',
    icon: Users
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Overlay pour mobile */}
      {!collapsed && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 
          transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${collapsed ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-blue-700">Diabolo IA</span>
          </Link>
          <button
            onClick={() => setCollapsed(true)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <Icon size={18} className={`mr-3 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Bouton pour ouvrir la sidebar sur mobile */}
      <button
        onClick={() => setCollapsed(false)}
        className={`
          fixed bottom-4 right-4 z-10 lg:hidden p-3 rounded-full 
          bg-blue-600 text-white shadow-lg hover:bg-blue-700
          ${!collapsed && 'hidden'}
        `}
      >
        <Menu size={24} />
      </button>
    </>
  );
}
