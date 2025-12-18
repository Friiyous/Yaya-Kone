
import React, { useState } from 'react';
import { Library, Plus, Trash2, Edit3, BookOpen } from 'lucide-react';
import { SUBJECTS } from '../../constants';

const AdminSubjects: React.FC = () => {
  const [subjects, setSubjects] = useState(SUBJECTS.map((s, i) => ({ id: `${i}`, name: s })));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setSubjects([{ id: Math.random().toString(), name: newName }, ...subjects]);
    setIsModalOpen(false);
    setNewName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Matières & Programmes</h1>
          <p className="text-gray-500">Gérez la liste des disciplines enseignées</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-ivoirien-green text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 shadow-md transition-all"
        >
          <Plus size={20} /> Nouvelle Matière
        </button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-bold">
            <tr>
              <th className="px-6 py-4">Nom de la matière</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subjects.map(sub => (
              <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                    <BookOpen size={16} />
                  </div>
                  <span className="font-bold text-gray-800">{sub.name}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-ivoirien-green"><Edit3 size={18} /></button>
                    <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Ajouter une matière</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Libellé</label>
                <input 
                  required
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-ivoirien-green"
                  placeholder="Ex: Informatique, Allemand..."
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border rounded-xl font-bold hover:bg-gray-50">Annuler</button>
                <button type="submit" className="flex-1 py-3 bg-ivoirien-green text-white rounded-xl font-bold hover:bg-green-700 shadow-lg">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubjects;
