
import React, { useState } from 'react';
import { User, UserRole, UserStatus } from '../../types';
import { Check, X, Search, Filter, Download, UserCheck, Trash2, CheckSquare, Square } from 'lucide-react';
import { getStatusColor, formatPhoneCI } from '../../lib/utils';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Moussa Fofana', email: 'moussa@example.com', phone: '0102030405', role: UserRole.STUDENT, status: UserStatus.PENDING, className: '3ème A' },
    { id: '2', name: 'Fatou Diaby', email: 'fatou@example.com', phone: '0708091011', role: UserRole.TEACHER, status: UserStatus.PENDING },
    { id: '3', name: 'Alain Konan', email: 'alain@example.com', phone: '0506070809', role: UserRole.STUDENT, status: UserStatus.APPROVED, className: '4ème B' },
    { id: '4', name: 'Soro Bakary', email: 'bakary@example.com', phone: '0101010101', role: UserRole.STUDENT, status: UserStatus.PENDING, className: 'Terminale D' },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === users.length) setSelectedIds([]);
    else setSelectedIds(users.map(u => u.id));
  };

  const approveSelected = () => {
    setUsers(users.map(u => selectedIds.includes(u.id) ? { ...u, status: UserStatus.APPROVED } : u));
    setSelectedIds([]);
  };

  const approveUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: UserStatus.APPROVED } : u));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
          <p className="text-gray-500">Gérez les accès et les inscriptions</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-bold shadow-sm">
            <Download size={18} />
            Exporter
          </button>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-ivoirien-orange text-white p-4 rounded-xl flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <UserCheck size={24} />
            <span className="font-bold">{selectedIds.length} utilisateurs sélectionnés</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={approveSelected}
              className="bg-white text-ivoirien-orange px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-orange-50 transition-all"
            >
              Approuver la sélection
            </button>
            <button 
              onClick={() => setSelectedIds([])}
              className="bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/30 transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Nom, email, classe..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-ivoirien-orange transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-100 font-bold text-sm text-gray-600 transition-all w-full md:w-auto justify-center">
            <Filter size={18} />
            Filtres avancés
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b">
                <th className="px-6 py-4 w-10">
                  <button onClick={toggleSelectAll} className="text-ivoirien-orange">
                    {selectedIds.length === users.length ? <CheckSquare size={20}/> : <Square size={20}/>}
                  </button>
                </th>
                <th className="px-6 py-4 font-semibold">Utilisateur</th>
                <th className="px-6 py-4 font-semibold">Rôle</th>
                <th className="px-6 py-4 font-semibold">Classe</th>
                <th className="px-6 py-4 font-semibold">Statut</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className={`transition-colors ${selectedIds.includes(user.id) ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleSelect(user.id)} className="text-gray-300 hover:text-ivoirien-orange transition-colors">
                      {selectedIds.includes(user.id) ? <CheckSquare size={20} className="text-ivoirien-orange"/> : <Square size={20}/>}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email} • {formatPhoneCI(user.phone)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[10px] font-black tracking-wider uppercase">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {user.className || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${getStatusColor(user.status)}`}>
                      {user.status === UserStatus.APPROVED ? 'Approuvé' : user.status === UserStatus.PENDING ? 'En attente' : 'Rejeté'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.status === UserStatus.PENDING ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => approveUser(user.id)}
                          className="p-2 text-ivoirien-green bg-green-50 rounded-lg hover:bg-ivoirien-green hover:text-white transition-all shadow-sm"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
