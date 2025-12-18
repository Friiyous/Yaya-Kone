
import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, Edit3, Users } from 'lucide-react';
import { CLASS_LEVELS } from '../../constants';

const AdminClasses: React.FC = () => {
  const [classes, setClasses] = useState([
    { id: '1', name: '3ème A', level: '3ème', studentCount: 30 },
    { id: '2', name: '6ème B', level: '6ème', studentCount: 32 },
    { id: '3', name: 'Tle D1', level: 'Terminale', studentCount: 28 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', level: CLASS_LEVELS[0] });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setClasses([...classes, { id: Math.random().toString(), ...newClass, studentCount: 0 }]);
    setIsModalOpen(false);
    setNewClass({ name: '', level: CLASS_LEVELS[0] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Classes</h1>
          <p className="text-gray-500">Organisez les niveaux et les sections</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-ivoirien-orange text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-600 shadow-md transition-all"
        >
          <Plus size={20} /> Nouvelle Classe
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(c => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-50 text-ivoirien-green rounded-xl flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-ivoirien-green"><Edit3 size={18} /></button>
                <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{c.name}</h3>
            <p className="text-sm text-gray-500 mb-4">Niveau : {c.level}</p>
            <div className="flex items-center gap-2 text-sm text-ivoirien-green font-bold bg-green-50 px-3 py-1 rounded-full w-fit">
              <Users size={16} /> {c.studentCount} Élèves
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl scale-in-center">
            <h2 className="text-2xl font-bold mb-6">Ajouter une classe</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Nom de la section</label>
                <input 
                  required
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-ivoirien-orange"
                  placeholder="Ex: 3ème A, Tle C1..."
                  value={newClass.name}
                  onChange={e => setNewClass({...newClass, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Niveau Scolaire</label>
                <select 
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-ivoirien-orange"
                  value={newClass.level}
                  onChange={e => setNewClass({...newClass, level: e.target.value})}
                >
                  {CLASS_LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border rounded-xl font-bold hover:bg-gray-50">Annuler</button>
                <button type="submit" className="flex-1 py-3 bg-ivoirien-orange text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClasses;
