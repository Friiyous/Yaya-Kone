
import React from 'react';
import { User } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle2, FileText, Users, AlertCircle } from 'lucide-react';

const TeacherDashboard: React.FC<{ teacher: User }> = ({ teacher }) => {
  const attendanceData = [
    { day: 'Lun', rate: 92 },
    { day: 'Mar', rate: 88 },
    { day: 'Mer', rate: 95 },
    { day: 'Jeu', rate: 90 },
    { day: 'Ven', rate: 85 },
  ];

  const submissionData = [
    { name: 'Rendus', value: 24 },
    { name: 'Non rendus', value: 6 },
  ];

  const COLORS = ['#006B3C', '#EF4444'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bienvenue, {teacher.name}</h1>
        <p className="text-gray-500">Classe principale : <span className="font-semibold text-ivoirien-orange">{teacher.className}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
          <div className="p-3 bg-green-100 text-ivoirien-green rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Effectif</p>
            <p className="text-xl font-bold">30 Élèves</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-ivoirien-orange rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Devoirs en cours</p>
            <p className="text-xl font-bold">3 actifs</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-500 rounded-lg">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Absences (Aujourd'hui)</p>
            <p className="text-xl font-bold">2 élèves</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold text-lg mb-6">Taux de présence (Hebdomadaire)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#006B3C" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold text-lg mb-6">Soumissions (Dernier devoir)</h3>
          <div className="h-64 flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={submissionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {submissionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4">
              {submissionData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  <span className="text-sm text-gray-600">{d.name} ({d.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
