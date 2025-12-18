
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Homework } from '../../types';
import { Plus, Trash2, Edit3, Eye, Calendar, FileText, Sparkles, Loader2, ChevronRight, GraduationCap, CloudOff, CheckCircle } from 'lucide-react';
import { formatDateCI } from '../../lib/utils';
import { GoogleGenAI } from "@google/genai";
import { syncManager } from '../../lib/sync';

const TeacherHomeworks: React.FC<{ teacher: User }> = ({ teacher }) => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Simulation de plusieurs classes pour l'enseignant (Data importante)
  const teacherClasses = [
    { id: '3A', name: '3ème A' },
    { id: '3B', name: '3ème B' },
    { id: '4A', name: '4ème A' },
    { id: 'ALL', name: 'Toutes mes classes' }
  ];

  // Chargement des devoirs depuis le cache local (localStorage) pour le mode hors-ligne
  const [homeworks, setHomeworks] = useState<Homework[]>(() => {
    const saved = localStorage.getItem(`homeworks_${teacher.id}`);
    if (saved) return JSON.parse(saved);
    return [
      { 
        id: '1', 
        title: 'Mathématiques : Théorème de Pythagore', 
        description: 'Faire les exercices 1, 3 et 5 de la page 42 du manuel.', 
        dueDate: '2025-04-10', 
        classId: '3A', 
        teacherId: teacher.id,
        submissionsCount: 24 
      },
      { 
        id: '2', 
        title: 'Français : Analyse du livre "Sous l\'orage"', 
        description: 'Rédiger une fiche de lecture sur les chapitres 1 à 3.', 
        dueDate: '2025-04-15', 
        classId: '3B', 
        teacherId: teacher.id,
        submissionsCount: 12
      },
    ];
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [newHw, setNewHw] = useState({ 
    title: '', 
    description: '', 
    dueDate: '', 
    classId: teacher.classId || teacherClasses[0].id 
  });

  // Persistance automatique dans le cache local à chaque modification
  useEffect(() => {
    localStorage.setItem(`homeworks_${teacher.id}`, JSON.stringify(homeworks));
  }, [homeworks, teacher.id]);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const generateWithAi = async () => {
    if (!newHw.title) {
      alert("Veuillez d'abord saisir un titre pour le devoir.");
      return;
    }
    
    if (!isOnline) {
      alert("La génération par IA nécessite une connexion internet.");
      return;
    }

    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `En tant qu'enseignant en Côte d'Ivoire, génère une consigne de devoir claire, motivante et pédagogique pour le sujet suivant : "${newHw.title}". Utilise un ton encourageant pour des élèves de la classe sélectionnée. La consigne doit être en français, structurée et faire environ 100 mots.`,
      });
      
      if (response.text) {
        setNewHw(prev => ({ ...prev, description: response.text }));
      }
    } catch (error) {
      console.error("Erreur IA:", error);
      alert("Impossible de générer la consigne avec l'IA pour le moment.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const hw: Homework = {
      id: 'local_' + Math.random().toString(36).substr(2, 9),
      ...newHw,
      teacherId: teacher.id,
      submissionsCount: 0
    };

    if (!isOnline) {
      syncManager.addToQueue('HOMEWORK', hw);
      alert('Mode hors-ligne : Le devoir est enregistré localement. Il sera synchronisé dès le retour de la connexion.');
    } else {
      console.log('Devoir publié sur le serveur');
    }

    setHomeworks([hw, ...homeworks]);
    setIsCreating(false);
    setNewHw({ title: '', description: '', dueDate: '', classId: teacher.classId || teacherClasses[0].id });
  };

  const deleteHomework = (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce devoir ?")) {
      setHomeworks(homeworks.filter(h => h.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Devoirs</h1>
          <p className="text-gray-500">Programmez les travaux pour vos classes assignées</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-ivoirien-orange text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 shadow-lg transition-all"
        >
          <Plus size={20} />
          Nouveau Devoir
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl scale-in-center overflow-y-auto max-h-[90vh] relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-ivoirien-green">Détails du devoir</h2>
              {!isOnline && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-ivoirien-orange rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <CloudOff size={12} /> Hors-ligne
                </div>
              )}
            </div>
            
            <form onSubmit={handleAdd} className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-widest">Classe de destination</label>
                <div className="grid grid-cols-2 gap-2">
                  {teacherClasses.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setNewHw({...newHw, classId: c.id})}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-sm font-bold ${
                        newHw.classId === c.id 
                        ? 'border-ivoirien-orange bg-orange-50 text-ivoirien-orange shadow-sm' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      <GraduationCap size={16} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1 tracking-widest">Titre du sujet</label>
                <input 
                  required
                  type="text" 
                  className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-ivoirien-orange transition-all font-bold"
                  placeholder="Ex: Analyse de texte - Le Pagne Noir"
                  value={newHw.title}
                  onChange={e => setNewHw({...newHw, title: e.target.value})}
                />
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-black uppercase text-gray-400 tracking-widest">Consignes et Détails</label>
                  <button 
                    type="button"
                    onClick={generateWithAi}
                    disabled={isAiLoading || !isOnline}
                    className="flex items-center gap-1.5 text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-full hover:bg-purple-100 transition-all disabled:opacity-50"
                  >
                    {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    {isAiLoading ? 'Génération...' : isOnline ? 'Assistant IA' : 'IA indisponible (OFF)'}
                  </button>
                </div>
                <textarea 
                  required
                  className="w-full border-2 border-gray-100 rounded-xl p-3 h-32 outline-none focus:border-ivoirien-orange transition-all text-sm leading-relaxed"
                  placeholder="Décrivez précisément le travail à faire..."
                  value={newHw.description}
                  onChange={e => setNewHw({...newHw, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1 tracking-widest">Date limite de rendu</label>
                <input 
                  required
                  type="date" 
                  className="w-full border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-ivoirien-orange transition-all font-bold"
                  value={newHw.dueDate}
                  onChange={e => setNewHw({...newHw, dueDate: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-3 border-2 border-gray-100 rounded-xl font-bold hover:bg-gray-50 transition-all text-gray-500"
                >
                  Fermer
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-ivoirien-orange text-white rounded-xl font-black hover:bg-orange-600 shadow-lg transition-all"
                >
                  {isOnline ? 'Publier' : 'Enregistrer (Local)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworks.length === 0 && (
          <div className="md:col-span-2 py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <FileText className="mx-auto text-gray-200 mb-4" size={64} />
            <p className="text-gray-400 font-medium">Aucun devoir programmé pour le moment.</p>
          </div>
        )}
        {homeworks.map(hw => {
          const isPendingSync = syncManager.isPending(hw.id);
          return (
            <div key={hw.id} className={`bg-white p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all relative group overflow-hidden ${isPendingSync ? 'border-orange-200 ring-2 ring-orange-100' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${isPendingSync ? 'bg-orange-100 text-ivoirien-orange' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-50 group-hover:text-ivoirien-orange transition-colors'}`}>
                    <FileText size={24} />
                  </div>
                  <div className="flex flex-col">
                    <div className="px-2 py-0.5 bg-ivoirien-green/10 text-ivoirien-green rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                      {teacherClasses.find(c => c.id === hw.classId)?.name || hw.classId}
                    </div>
                    {isPendingSync && (
                      <span className="text-[9px] font-black text-ivoirien-orange uppercase tracking-wider mt-1 flex items-center gap-1 animate-pulse">
                        <CloudOff size={10} /> En attente de synchro
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-300 hover:text-ivoirien-green transition-colors"><Edit3 size={18} /></button>
                  <button 
                    onClick={() => deleteHomework(hw.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">{hw.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed italic">"{hw.description}"</p>
              
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <Calendar size={14} className="text-ivoirien-orange" />
                    {hw.dueDate ? formatDateCI(hw.dueDate) : 'Non définie'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-ivoirien-green uppercase tracking-wider bg-green-50 px-2 py-1 rounded-lg">
                    <CheckCircle size={14} />
                    {hw.submissionsCount} Rendus
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/teacher/submissions/${hw.id}`)}
                  className="p-2 bg-ivoirien-green text-white rounded-xl hover:bg-green-700 transition-all shadow-md group-hover:scale-110"
                  title="Voir les soumissions"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherHomeworks;
