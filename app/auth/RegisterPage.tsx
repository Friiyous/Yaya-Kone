
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole, UserStatus } from '../../types';
import { CLASS_LEVELS } from '../../constants';

const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    classLevel: CLASS_LEVELS[0]
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'inscription
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-ivoirien-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Inscription réussie !</h1>
          <p className="text-gray-600 mb-8">
            Votre demande d'inscription a été transmise à l'administration. Vous recevrez un email dès que votre compte sera approuvé.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-ivoirien-orange text-white py-3 rounded-lg font-semibold"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ivoirien-green">Créer un compte</h1>
          <p className="text-gray-500 mt-2">Rejoignez la communauté ÉcoleDirecteCI</p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
          <button 
            onClick={() => setRole(UserRole.STUDENT)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === UserRole.STUDENT ? 'bg-white shadow text-ivoirien-orange' : 'text-gray-500'}`}
          >
            Élève
          </button>
          <button 
            onClick={() => setRole(UserRole.TEACHER)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === UserRole.TEACHER ? 'bg-white shadow text-ivoirien-orange' : 'text-gray-500'}`}
          >
            Enseignant
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-ivoirien-orange"
              placeholder="Ex: Kouassi Konan"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-ivoirien-orange"
              placeholder="votre@email.ci"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-ivoirien-orange"
              placeholder="+225 01 02 03 04 05"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {role === UserRole.STUDENT && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-ivoirien-orange"
                value={formData.classLevel}
                onChange={e => setFormData({...formData, classLevel: e.target.value})}
              >
                {CLASS_LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-ivoirien-orange"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-ivoirien-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md mt-4"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ? <Link to="/login" className="text-ivoirien-orange font-semibold">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
