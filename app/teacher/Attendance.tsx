
import React, { useState, useEffect } from 'react';
import { User, AttendanceStatus } from '../../types';
import { Check, X, Clock, Save, ChevronLeft, ChevronRight, CheckSquare, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { formatDateCI } from '../../lib/utils';
import { syncManager } from '../../lib/sync';

const TeacherAttendance: React.FC<{ teacher: User }> = ({ teacher }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [students, setStudents] = useState([
    { id: '1', name: 'Awa Traoré', status: AttendanceStatus.PRESENT, note: '' },
    { id: '2', name: 'Moussa Fofana', status: AttendanceStatus.PRESENT, note: '' },
    { id: '3', name: 'Bakayoko Sidiki', status: AttendanceStatus.ABSENT, note: 'Paludisme' },
    { id: '4', name: 'Koné Fatoumata', status: AttendanceStatus.LATE, note: 'Sotra en retard' },
    { id: '5', name: 'Yao Kouakou', status: AttendanceStatus.PRESENT, note: '' },
  ]);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const toggleStatus = (id: string, newStatus: AttendanceStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: AttendanceStatus.PRESENT })));
  };

  const updateNote = (id: string, note: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, note } : s));
  };

  const handleSave = async () => {
    const payload = {
      date: selectedDate.toISOString(),
      classId: teacher.classId,
      attendance: students
    };

    if (!isOnline) {
      syncManager.addToQueue('ATTENDANCE', payload);
      alert('Vous êtes hors-ligne. L\'appel a été enregistré localement et sera synchronisé dès le retour de la connexion.');
    } else {
      setIsSyncing(true);
      // Simulation d'envoi serveur
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSyncing(false);
      alert('Appel sauvegardé avec succès sur le serveur pour le ' + formatDateCI(selectedDate));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold">Faire l'appel</h1>
            <p className="text-gray-500 text-sm">Classe : <span className="text-ivoirien-orange font-bold">{teacher.className}</span></p>
          </div>
          {isOnline ? (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-ivoirien-green rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Wifi size={12} /> Connecté
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <WifiOff size={12} /> Hors-ligne
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={markAllPresent}
            className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-all border border-blue-100"
          >
            <CheckSquare size={18} />
            Tous Présents
          </button>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button className="p-2 hover:bg-white rounded transition-all"><ChevronLeft size={18} /></button>
            <span className="px-3 font-bold text-xs">{formatDateCI(selectedDate)}</span>
            <button className="p-2 hover:bg-white rounded transition-all"><ChevronRight size={18} /></button>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all shadow-md ${isSyncing ? 'bg-gray-400 cursor-not-allowed' : 'bg-ivoirien-green text-white hover:bg-green-700'}`}
          >
            {isSyncing ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            {isSyncing ? 'Synchronisation...' : 'Valider l\'appel'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-[10px] uppercase text-gray-400 font-black tracking-widest">
              <th className="px-6 py-4">Élève</th>
              <th className="px-6 py-4 text-center">Présent</th>
              <th className="px-6 py-4 text-center">Absent</th>
              <th className="px-6 py-4 text-center">Retard</th>
              <th className="px-6 py-4">Justification / Note</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-800">{student.name}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => toggleStatus(student.id, AttendanceStatus.PRESENT)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${student.status === AttendanceStatus.PRESENT ? 'bg-ivoirien-green text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-400 hover:bg-green-50'}`}
                    >
                      <Check size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => toggleStatus(student.id, AttendanceStatus.ABSENT)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${student.status === AttendanceStatus.ABSENT ? 'bg-red-500 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-400 hover:bg-red-50'}`}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => toggleStatus(student.id, AttendanceStatus.LATE)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${student.status === AttendanceStatus.LATE ? 'bg-ivoirien-orange text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-400 hover:bg-orange-50'}`}
                    >
                      <Clock size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Ajouter un motif..."
                      className="w-full bg-gray-50 border border-transparent focus:border-ivoirien-orange focus:bg-white rounded-lg px-3 py-1.5 text-xs outline-none transition-all"
                      value={student.note}
                      onChange={(e) => updateNote(student.id, e.target.value)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherAttendance;
