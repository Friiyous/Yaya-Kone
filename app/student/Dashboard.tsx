
import React from 'react';
import { User } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Calendar, Star, FileText } from 'lucide-react';

const StudentDashboard: React.FC<{ student: User }> = ({ student }) => {
  const gradesData = [
    { subject: 'Math', note: 15.5 },
    { subject: 'Français', note: 12 },
    { subject: 'SVT', note: 14 },
    { subject: 'Anglais', note: 17 },
    { subject: 'Physique', note: 13.5 },
  ];

  const attendanceData = [
    { name: 'Présent', value: 92 },
    { name: 'Absent', value: 8 },
  ];

  const COLORS = ['#006B3C', '#EF4444'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Salut, {student.name} ! 👋</h1>
        <p className="text-gray-500">Classe : <span className="font-semibold">{student.className}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Star size={20} />
          </div>
          <p className="text-sm text-gray-500">Moyenne Générale</p>
          <p className="text-2xl font-bold">14.4 / 20</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <div className="w-10 h-10 bg-green-100 text-ivoirien-green rounded-lg flex items-center justify-center mb-4">
            <BookOpen size={20} />
          </div>
          <p className="text-sm text-gray-500">Devoirs à faire</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <div className="w-10 h-10 bg-orange-100 text-ivoirien-orange rounded-lg flex items-center justify-center mb-4">
            <FileText size={20} />
          </div>
          <p className="text-sm text-gray-500">Dernière note</p>
          <p className="text-2xl font-bold">16 / 20</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <div className="w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center mb-4">
            <Calendar size={20} />
          </div>
          <p className="text-sm text-gray-500">Absences ce mois</p>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
          <h3 className="font-bold text-lg mb-6">Mes Notes par Matière</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Bar dataKey="note" fill="#FF8200" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold text-lg mb-6">Taux de présence</h3>
          <div className="h-64 flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4">
              {attendanceData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  {d.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
