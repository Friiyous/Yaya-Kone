
import React from 'react';
import { User, UserRole } from '../../types';
// Added ChevronRight to the lucide-react imports
import { UserCircle, Mail, Phone, MapPin, Award, ShieldCheck, Camera, ChevronRight } from 'lucide-react';
import { formatPhoneCI } from '../../lib/utils';

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-ivoirien-orange to-ivoirien-green rounded-3xl shadow-lg"></div>
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-xl">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400 overflow-hidden">
                <UserCircle size={80} />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white border shadow-md rounded-full text-ivoirien-orange hover:bg-orange-50 transition-colors">
              <Camera size={20} />
            </button>
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-black text-gray-900">{user.name}</h1>
            <p className="text-ivoirien-orange font-bold uppercase tracking-widest text-sm">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-ivoirien-green" /> Informations personnelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={18} className="text-gray-400" />
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase">Téléphone</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={18} className="text-gray-400" />
                  <span>{formatPhoneCI(user.phone)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase">Localisation</p>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={18} className="text-gray-400" />
                  <span>Abidjan, Côte d'Ivoire</span>
                </div>
              </div>
              {user.className && (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase">Classe actuelle</p>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award size={18} className="text-ivoirien-orange" />
                    <span className="font-bold">{user.className}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Paramètres du compte</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-xl border hover:bg-gray-50 transition-colors flex justify-between items-center group">
                <div>
                  <p className="font-bold">Modifier le mot de passe</p>
                  <p className="text-sm text-gray-500">Sécurisez votre compte</p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-ivoirien-orange transition-colors" />
              </button>
              <button className="w-full text-left p-4 rounded-xl border hover:bg-gray-50 transition-colors flex justify-between items-center group">
                <div>
                  <p className="font-bold">Préférences de notification</p>
                  <p className="text-sm text-gray-500">Gérez vos alertes par email et SMS</p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-ivoirien-orange transition-colors" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-ivoirien-green text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">Statut de validation</h3>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold">Compte Vérifié</span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Votre profil est certifié par l'administration de l'établissement. Vous avez accès à l'intégralité des services ÉcoleDirecteCI.
              </p>
            </div>
            <ShieldCheck size={120} className="absolute -right-8 -bottom-8 opacity-10 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
