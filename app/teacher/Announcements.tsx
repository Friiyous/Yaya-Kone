
import React, { useState } from 'react';
import { User } from '../../types';
import { Plus, Megaphone, Trash2, Clock } from 'lucide-react';

const TeacherAnnouncements: React.FC<{ teacher: User }> = ({ teacher }) => {
  const [announcements, setAnnouncements] = useState([
    { id: '1', content: 'Rappel : La réunion parents-professeurs aura lieu ce samedi à 9h.', date: '2025-03-25T08:00:00Z' },
    { id: '2', content: 'N\'oubliez pas vos calculatrices pour le cours de demain.', date: '2025-03-28T16:30:00Z' },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState('');

  const handlePost = () => {
    if (!newContent) return;
    const item = {
      id: Math.random().toString(),
      content: newContent,
      date: new Date().toISOString()
    };
    setAnnouncements([item, ...announcements]);
    setNewContent('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Annonces de classe</h1>
          <p className="text-gray-500">Communiquez avec vos élèves de {teacher.className}</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-ivoirien-orange text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-600 shadow-md"
        >
          <Plus size={20} />
          Nouvelle annonce
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white p-6 rounded-2xl border shadow-sm flex gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Megaphone size={20} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 leading-relaxed mb-3">{ann.content}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock size={12}/> {new Date(ann.date).toLocaleDateString('fr-CI')}</span>
                <button className="text-red-400 hover:text-red-600 font-bold">Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Publier une annonce</h2>
            <textarea 
              className="w-full border rounded-xl p-4 h-40 outline-none focus:ring-2 focus:ring-ivoirien-orange mb-6"
              placeholder="Écrivez votre message ici..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
            />
            <div className="flex gap-4">
              <button onClick={() => setIsCreating(false)} className="flex-1 py-2 border rounded-lg font-medium">Annuler</button>
              <button onClick={handlePost} className="flex-1 py-2 bg-ivoirien-orange text-white rounded-lg font-bold">Publier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAnnouncements;
