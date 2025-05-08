'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { Bell, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <div>
          {/* Titre de la page ou breadcrumbs - à compléter selon besoins */}
        </div>

        <div className="flex items-center space-x-4">
          {/* Bouton de notifications */}
          <button className="p-1.5 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>

          {/* Menu utilisateur */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={18} className="text-blue-700" />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user?.user_metadata?.prenom || user?.email}
              </span>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-2 px-4 border-b border-gray-100">
                  <p className="font-medium">{user?.user_metadata?.prenom} {user?.user_metadata?.nom}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link 
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profil
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      signOut();
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
