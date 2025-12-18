
import React, { useState } from 'react';
import { User, Homework } from '../../types';
import { FileText, Upload, CheckCircle2, AlertCircle, Clock, Star } from 'lucide-react';
import { formatDateCI } from '../../lib/utils';

const StudentHomeworks: React.FC<{ student: User }> = ({ student }) => {
  const pendingHomeworks: Homework[] = [
    { 
      id: '1', 
      title: 'Physique-Chimie : Les ions', 
      description: 'Répondre aux questions de l\'activité 1 du chapitre 4.', 
      dueDate: '2025-04-05', 
      classId: '3A', 
      teacherId: 'T1',
      submissionsCount: 0 
    },
  ];

  const gradedHomeworks = [
    {
      id: 'g1',
      title: 'Français : Commentaire composé',
      grade: 16.5,
      feedback: 'Très bonne analyse, continue ainsi ! Attention à la structure du plan.',
      date: '2025-03-20'
    }
  ];

  const [selectedHw, setSelectedHw] = useState<Homework | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Devoir rendu avec succès !');
    setSelectedHw(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Mes Devoirs</h1>
        <p className="text-gray-500">Gérez vos travaux et consultez vos notes</p>
      </div>

      {/* Section À Rendre */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-ivoirien-orange">
          <Clock size={20} /> À rendre
        </h2>
        {pendingHomeworks.map(hw => (
          <div key={hw.id} className="bg-white p-6 rounded-2xl border flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
            <div className="p-4 bg-orange-100 text-ivoirien-orange rounded-2xl shrink-0">
              <FileText size={32} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-lg">{hw.title}</h3>
                <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-xs font-bold flex items-center gap-1">
                  <AlertCircle size={12} /> Urgent
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{hw.description}</p>
              <div className="text-xs text-gray-500">Date limite : {formatDateCI(hw.dueDate)}</div>
            </div>
            <button 
              onClick={() => setSelectedHw(hw)}
              className="w-full md:w-auto px-6 py-2 bg-ivoirien-green text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Upload size={18} /> Rendre
            </button>
          </div>
        ))}
      </section>

      {/* Section Notés */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-ivoirien-green">
          <Star size={20} /> Devoirs notés
        </h2>
        {gradedHomeworks.map(hw => (
          <div key={hw.id} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{hw.title}</h3>
              <div className="bg-green-50 p-4 rounded-xl mb-3">
                <p className="text-sm font-bold text-ivoirien-green mb-1">Feedback du professeur :</p>
                <p className="text-sm text-gray-700 italic">"{hw.feedback}"</p>
              </div>
              <p className="text-xs text-gray-400">Corrigé le {formatDateCI(hw.date)}</p>
            </div>
            <div className="shrink-0 flex flex-col items-center justify-center bg-gray-50 px-8 py-4 rounded-xl border border-dashed border-ivoirien-green">
              <span className="text-xs font-bold text-gray-500 uppercase">Note</span>
              <span className="text-3xl font-black text-ivoirien-green">{hw.grade}<span className="text-sm text-gray-400">/20</span></span>
            </div>
          </div>
        ))}
      </section>

      {selectedHw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Rendre le devoir</h2>
            <p className="text-gray-500 mb-6 text-sm">{selectedHw.title}</p>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <input type="file" id="file-upload" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)}/>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-4" size={40} />
                  <p className="font-medium text-gray-700">Sélectionnez votre copie</p>
                  {file && <p className="mt-4 text-ivoirien-green font-bold text-sm">Prêt : {file.name}</p>}
                </label>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setSelectedHw(null)} className="flex-1 py-2 border rounded-lg font-medium">Annuler</button>
                <button type="submit" disabled={!file} className="flex-1 py-2 bg-ivoirien-orange text-white rounded-lg font-bold disabled:opacity-50">Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomeworks;
