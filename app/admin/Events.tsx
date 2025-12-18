
import React, { useState } from 'react';
import { IVORIAN_HOLIDAYS } from '../../constants';
import { SchoolEvent } from '../../types';
import { Calendar as CalendarIcon, Plus, Trash2, MapPin, Clock } from 'lucide-react';
import { formatDateCI } from '../../lib/utils';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<SchoolEvent[]>([...IVORIAN_HOLIDAYS.map((h, i) => ({ ...h, id: `h-${i}` })) as SchoolEvent[]]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Calendrier Scolaire</h1>
          <p className="text-gray-500">Gérez les jours fériés et événements de l'établissement</p>
        </div>
        <button className="bg-ivoirien-orange text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-600 shadow-md">
          <Plus size={20} />
          Ajouter un événement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b font-bold flex items-center gap-2 text-ivoirien-green">
              <CalendarIcon size={20} />
              Événements à venir
            </div>
            <div className="divide-y">
              {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
                <div key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[60px] p-2 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-xs font-bold text-ivoirien-orange uppercase">
                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </p>
                      <p className="text-xl font-black text-ivoirien-orange">
                        {new Date(event.date).getDate()}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{event.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Clock size={12}/> Toute la journée</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${event.type === 'HOLIDAY' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                          {event.type === 'HOLIDAY' ? 'FÉRIÉ' : 'SCOLAIRE'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-ivoirien-green text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Conseil Admin</h3>
              <p className="text-sm opacity-90">Les jours fériés nationaux de Côte d'Ivoire sont pré-chargés automatiquement chaque année.</p>
            </div>
            <CalendarIcon className="absolute -right-4 -bottom-4 opacity-10 w-24 h-24 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
