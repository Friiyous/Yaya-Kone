
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole, UserStatus } from '../../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'authentification
    setTimeout(() => {
      let mockUser: User | null = null;
      
      if (id === 'admin@ecole.ci') {
        mockUser = { id: '1', name: 'Admin Principal', email: id, phone: '0123456789', role: UserRole.ADMIN, status: UserStatus.APPROVED };
      } else if (id === 'prof@ecole.ci') {
        mockUser = { id: '2', name: 'M. Koffi Kouakou', email: id, phone: '0707070707', role: UserRole.TEACHER, status: UserStatus.APPROVED, className: '3ème A' };
      } else if (id === 'eleve@ecole.ci') {
        mockUser = { id: '3', name: 'Awa Traoré', email: id, phone: '0505050505', role: UserRole.STUDENT, status: UserStatus.APPROVED, className: '3ème A' };
      } else if (id === 'pending@ecole.ci') {
        mockUser = { id: '4', name: 'Jean Dupont', email: id, phone: '0101010101', role: UserRole.STUDENT, status: UserStatus.PENDING };
      }

      if (mockUser) {
        onLogin(mockUser);
        navigate('/');
      } else {
        alert('Identifiants invalides pour la démo. Utilisez les emails suggérés ci-dessous.');
      }
      setIsLoading(false);
    }, 800);
  };

  const fillCredentials = (email: string) => {
    setId(email);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-orange-100 rounded-2xl mb-4">
            <span className="text-ivoirien-orange font-bold text-3xl">ED</span>
          </div>
          <h1 className="text-2xl font-bold text-ivoirien-green">ÉcoleDirecte<span className="text-ivoirien-orange">CI</span></h1>
          <p className="text-gray-500 mt-1">Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email ou Téléphone</label>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ivoirien-orange focus:border-transparent outline-none transition-all"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <a href="#" className="text-xs text-ivoirien-orange hover:underline">Oublié ?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ivoirien-orange focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-ivoirien-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">Accès Rapide (Démo)</p>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => fillCredentials('admin@ecole.ci')}
              className="text-[11px] bg-gray-50 border border-gray-200 py-2 px-2 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-all text-left"
            >
              <span className="font-bold block text-ivoirien-green">ADMIN</span> admin@ecole.ci
            </button>
            <button 
              onClick={() => fillCredentials('prof@ecole.ci')}
              className="text-[11px] bg-gray-50 border border-gray-200 py-2 px-2 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-all text-left"
            >
              <span className="font-bold block text-ivoirien-green">PROF</span> prof@ecole.ci
            </button>
            <button 
              onClick={() => fillCredentials('eleve@ecole.ci')}
              className="text-[11px] bg-gray-50 border border-gray-200 py-2 px-2 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-all text-left"
            >
              <span className="font-bold block text-ivoirien-green">ÉLÈVE</span> eleve@ecole.ci
            </button>
            <button 
              onClick={() => fillCredentials('pending@ecole.ci')}
              className="text-[11px] bg-gray-50 border border-gray-200 py-2 px-2 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-all text-left"
            >
              <span className="font-bold block text-ivoirien-green">ATTENTE</span> pending@ecole.ci
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Nouveau ? <Link to="/register" className="text-ivoirien-green font-semibold hover:underline">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
