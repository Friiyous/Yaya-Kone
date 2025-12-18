
import React from 'react';
import { User } from '../../types';
import { Megaphone, Calendar } from 'lucide-react';

const StudentAnnouncements: React.FC<{ student: User }> = ({ student }) => {
  const announcements = [
    { id: '1', author: 'M. Koffi', content: 'Rappel : La réunion parents-professeurs aura lieu ce samedi à 9h.', date: '2025-03-25T08:00:00Z' },
    { id: '2', author: 'M. Koffi', content: 'N\'oubliez pas vos calculatrices pour le cours de demain.', date: '2025-03-28T16:30:00Z' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Annonces de la classe</h1>
        <p className="text-gray-500">Messages importants de vos professeurs</p>
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white p-6 rounded-2xl border shadow-sm border-l-4 border-l-ivoirien-orange flex gap-4">
            <div className="w-12 h-12 bg-orange-50 text-ivoirien-orange rounded-full flex items-center justify-center shrink-0">
              <Megaphone size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="font-black text-ivoirien-green">{ann.author}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} /> {new Date(ann.date).toLocaleDateString('fr-CI')}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{ann.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAnnouncements;
