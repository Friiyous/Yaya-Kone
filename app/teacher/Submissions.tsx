
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Submission } from '../../types';
import { ChevronLeft, Download, Send, CheckCircle } from 'lucide-react';

const TeacherSubmissions: React.FC<{ teacher: User }> = ({ teacher }) => {
  const { homeworkId } = useParams();
  const navigate = useNavigate();
  
  const [submissions, setSubmissions] = useState<Submission[]>([
    { 
      id: 's1', 
      studentId: '3', 
      studentName: 'Awa Traoré', 
      homeworkId: homeworkId!, 
      fileUrl: '#', 
      submittedAt: '2025-03-28T14:30:00Z' 
    },
    { 
      id: 's2', 
      studentId: '5', 
      studentName: 'Yao Kouakou', 
      homeworkId: homeworkId!, 
      fileUrl: '#', 
      grade: 14, 
      feedback: 'Bon travail d\'ensemble.',
      submittedAt: '2025-03-27T10:15:00Z' 
    },
  ]);

  const [gradingId, setGradingId] = useState<string | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSaveGrade = (id: string) => {
    setSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, grade: parseFloat(grade), feedback } : s
    ));
    setGradingId(null);
    setGrade('');
    setFeedback('');
    alert('Note enregistrée !');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-lg border bg-gray-50">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Correction : Devoir de Mathématiques</h1>
          <p className="text-gray-500 text-sm">Classe {teacher.className} • {submissions.length} copies rendues</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-bold">
            <tr>
              <th className="px-6 py-4">Élève</th>
              <th className="px-6 py-4">Date de remise</th>
              <th className="px-6 py-4 text-center">Fichier</th>
              <th className="px-6 py-4 text-center">Note / 20</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {submissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-800">{sub.studentName}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(sub.submittedAt).toLocaleDateString('fr-CI')} à {new Date(sub.submittedAt).toLocaleTimeString('fr-CI', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button className="flex items-center gap-2 text-ivoirien-green hover:underline text-sm font-semibold">
                      <Download size={16} /> Copie.pdf
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {sub.grade !== undefined ? (
                    <span className={`font-black text-lg ${sub.grade >= 10 ? 'text-ivoirien-green' : 'text-red-500'}`}>
                      {sub.grade}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Non noté</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => {
                      setGradingId(sub.id);
                      setGrade(sub.grade?.toString() || '');
                      setFeedback(sub.feedback || '');
                    }}
                    className="px-4 py-1.5 bg-ivoirien-orange text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
                  >
                    {sub.grade !== undefined ? 'Modifier' : 'Noter'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {gradingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Noter la copie</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Note sur 20</label>
                <input 
                  type="number" 
                  max="20" 
                  min="0"
                  step="0.5"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-ivoirien-orange text-lg font-bold"
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  placeholder="Ex: 15.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Commentaire / Feedback</label>
                <textarea 
                  className="w-full border rounded-lg p-3 h-24 outline-none focus:ring-2 focus:ring-ivoirien-orange"
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Bravo, continue ainsi..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setGradingId(null)}
                  className="flex-1 py-2 border rounded-lg font-medium hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button 
                  onClick={() => handleSaveGrade(gradingId)}
                  className="flex-1 py-2 bg-ivoirien-green text-white rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSubmissions;
