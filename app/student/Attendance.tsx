
import React from 'react';
import { User } from '../../types';
import { CheckCircle2, XCircle, Clock, Info } from 'lucide-react';

const StudentAttendance: React.FC<{ student: User }> = ({ student }) => {
  // Simulation de données de présence
  const attendance = [
    { date: '2025-03-03', status: 'PRESENT' },
    { date: '2025-03-04', status: 'PRESENT' },
    { date: '2025-03-05', status: 'ABSENT' },
    { date: '2025-03-06', status: 'LATE' },
    { date: '2025-03-07', status: 'PRESENT' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mon Suivi de Présence</h1>
        <p className="text-gray-500">Consultez l'historique de votre assiduité</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Mars 2025</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-1 text-xs text-gray-500">
                 <div className="w-3 h-3 bg-ivoirien-green rounded-full"></div> Présent
               </div>
               <div className="flex items-center gap-1 text-xs text-gray-500">
                 <div className="w-3 h-3 bg-red-500 rounded-full"></div> Absent
               </div>
               <div className="flex items-center gap-1 text-xs text-gray-500">
                 <div className="w-3 h-3 bg-ivoirien-orange rounded-full"></div> Retard
               </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
              <div key={d} className="text-xs font-bold text-gray-400 uppercase">{d}</div>
            ))}
            {/* Simulation de calendrier simplifié */}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const dateStr = `2025-03-${day.toString().padStart(2, '0')}`;
              const record = attendance.find(a => a.date === dateStr);
              
              let bgColor = 'bg-gray-50';
              if (record?.status === 'PRESENT') bgColor = 'bg-green-100 text-ivoirien-green border-green-200';
              if (record?.status === 'ABSENT') bgColor = 'bg-red-100 text-red-600 border-red-200';
              if (record?.status === 'LATE') bgColor = 'bg-orange-100 text-ivoirien-orange border-orange-200';

              return (
                <div key={i} className={`h-12 md:h-16 flex items-center justify-center rounded-xl border text-sm font-medium transition-all ${bgColor}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="font-bold mb-4">Statistiques du mois</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 size={18} className="text-ivoirien-green" />
                  <span>Présences</span>
                </div>
                <span className="font-bold">18 jours</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <XCircle size={18} className="text-red-500" />
                  <span>Absences</span>
                </div>
                <span className="font-bold">1 jour</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} className="text-ivoirien-orange" />
                  <span>Retards</span>
                </div>
                <span className="font-bold">1 jour</span>
              </div>
              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between items-center text-ivoirien-green font-bold">
                  <span>Taux de présence</span>
                  <span>95%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
            <Info className="text-blue-500 shrink-0" size={20} />
            <p className="text-xs text-blue-700 leading-relaxed">
              En cas d'erreur sur votre présence, veuillez contacter votre professeur principal muni d'un justificatif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
