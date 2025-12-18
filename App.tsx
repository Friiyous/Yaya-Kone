
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  Bell, 
  LogOut, 
  UserCircle,
  CheckCircle2,
  XCircle,
  Menu,
  ChevronRight,
  MessageSquare,
  Library,
  GraduationCap,
  Settings,
  WifiOff,
  Search,
  RefreshCw
} from 'lucide-react';
import { UserRole, UserStatus, User } from './types';
import { syncManager } from './lib/sync';

// Pages
import LoginPage from './app/auth/LoginPage';
import RegisterPage from './app/auth/RegisterPage';
import AdminDashboard from './app/admin/Dashboard';
import AdminUsers from './app/admin/Users';
import AdminEvents from './app/admin/Events';
import AdminClasses from './app/admin/Classes';
import AdminSubjects from './app/admin/Subjects';
import TeacherDashboard from './app/teacher/Dashboard';
import TeacherAttendance from './app/teacher/Attendance';
import TeacherHomeworks from './app/teacher/Homeworks';
import TeacherSubmissions from './app/teacher/Submissions';
import TeacherAnnouncements from './app/teacher/Announcements';
import StudentDashboard from './app/student/Dashboard';
import StudentHomeworks from './app/student/Homeworks';
import StudentAttendance from './app/student/Attendance';
import StudentAnnouncements from './app/student/Announcements';
import UserProfile from './app/shared/Profile';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  user: User | null;
  onLogout: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles, user, onLogout }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (user.status !== UserStatus.APPROVED) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <Bell className="text-ivoirien-orange w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Compte en attente d'approbation</h1>
        <p className="text-gray-600 max-w-md">
          Votre inscription a été reçue. Un administrateur doit valider votre compte avant que vous puissiez accéder au portail ÉcoleDirecteCI.
        </p>
        <button 
          onClick={onLogout}
          className="mt-8 px-6 py-2 bg-ivoirien-orange text-white rounded-lg font-medium"
        >
          Retour à la connexion
        </button>
      </div>
    );
  }
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(syncManager.getQueueSize());

  useEffect(() => {
    const savedUser = localStorage.getItem('edci_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const handleOnline = async () => {
      setIsOffline(false);
      const count = syncManager.getQueueSize();
      if (count > 0) {
        setIsSyncing(true);
        await syncManager.processQueue();
        setIsSyncing(false);
        setPendingSyncCount(0);
        alert(`Synchronisation terminée : ${count} actions mises à jour.`);
      }
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      setPendingSyncCount(syncManager.getQueueSize());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Vérification initiale
    if (navigator.onLine && syncManager.getQueueSize() > 0) {
      handleOnline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('edci_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edci_user');
  };

  return (
    <HashRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        {isOffline && (
          <div className="bg-ivoirien-orange text-white text-center py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 z-[100] relative shrink-0">
            <WifiOff size={14} /> Mode Hors-ligne activé • {pendingSyncCount} action(s) en attente
          </div>
        )}
        {isSyncing && (
          <div className="bg-ivoirien-green text-white text-center py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 z-[100] relative shrink-0">
            <RefreshCw size={14} className="animate-spin" /> Synchronisation des données en cours...
          </div>
        )}
        <div className="flex-1 flex overflow-hidden">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={login} />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]} user={user} onLogout={logout}>
                <DashboardLayout user={user} onLogout={logout}>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="classes" element={<AdminClasses />} />
                    <Route path="subjects" element={<AdminSubjects />} />
                    <Route path="events" element={<AdminEvents />} />
                    <Route path="profile" element={<UserProfile user={user!} />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Teacher Routes */}
            <Route path="/teacher/*" element={
              <ProtectedRoute allowedRoles={[UserRole.TEACHER]} user={user} onLogout={logout}>
                <DashboardLayout user={user} onLogout={logout}>
                  <Routes>
                    <Route path="dashboard" element={<TeacherDashboard teacher={user!} />} />
                    <Route path="attendance" element={<TeacherAttendance teacher={user!} />} />
                    <Route path="homeworks" element={<TeacherHomeworks teacher={user!} />} />
                    <Route path="submissions/:homeworkId" element={<TeacherSubmissions teacher={user!} />} />
                    <Route path="announcements" element={<TeacherAnnouncements teacher={user!} />} />
                    <Route path="profile" element={<UserProfile user={user!} />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Student Routes */}
            <Route path="/student/*" element={
              <ProtectedRoute allowedRoles={[UserRole.STUDENT]} user={user} onLogout={logout}>
                <DashboardLayout user={user} onLogout={logout}>
                  <Routes>
                    <Route path="dashboard" element={<StudentDashboard student={user!} />} />
                    <Route path="homeworks" element={<StudentHomeworks student={user!} />} />
                    <Route path="attendance" element={<StudentAttendance student={user!} />} />
                    <Route path="announcements" element={<StudentAnnouncements student={user!} />} />
                    <Route path="profile" element={<UserProfile user={user!} />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/" element={
              user ? (
                user.role === UserRole.ADMIN ? <Navigate to="/admin/dashboard" /> :
                user.role === UserRole.TEACHER ? <Navigate to="/teacher/dashboard" /> :
                <Navigate to="/student/dashboard" />
              ) : <Navigate to="/login" />
            } />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const adminMenu = [
    { name: 'Tableau de bord', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Utilisateurs', path: '/admin/users', icon: Users },
    { name: 'Classes', path: '/admin/classes', icon: GraduationCap },
    { name: 'Matières', path: '/admin/subjects', icon: Library },
    { name: 'Calendrier', path: '/admin/events', icon: Calendar },
  ];

  const teacherMenu = [
    { name: 'Tableau de bord', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'Présences', path: '/teacher/attendance', icon: CheckCircle2 },
    { name: 'Devoirs', path: '/teacher/homeworks', icon: FileText },
    { name: 'Annonces', path: '/teacher/announcements', icon: MessageSquare },
  ];

  const studentMenu = [
    { name: 'Tableau de bord', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Mes Devoirs', path: '/student/homeworks', icon: FileText },
    { name: 'Mes Absences', path: '/student/attendance', icon: Calendar },
    { name: 'Annonces', path: '/student/announcements', icon: Bell },
  ];

  const menu = user?.role === UserRole.ADMIN ? adminMenu :
               user?.role === UserRole.TEACHER ? teacherMenu : studentMenu;

  return (
    <div className="flex w-full bg-gray-50 overflow-hidden">
      <aside className={`bg-white border-r shadow-sm transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col z-20`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-ivoirien-orange rounded shadow-lg flex items-center justify-center text-white font-bold shrink-0">ED</div>
          {isSidebarOpen && <span className="font-bold text-xl text-ivoirien-green whitespace-nowrap">ÉcoleDirecte<span className="text-ivoirien-orange">CI</span></span>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-ivoirien-orange rounded-xl transition-all font-medium"
            >
              <item.icon size={20} className="shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link
              to={`/${user?.role.toLowerCase()}/profile`}
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all font-medium"
            >
              <Settings size={20} className="shrink-0" />
              {isSidebarOpen && <span>Mon Profil</span>}
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl w-full transition-all font-medium"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg shrink-0">
              <Menu size={24} />
            </button>
            <div className="max-w-md w-full relative hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Rechercher un élève, un devoir..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-ivoirien-orange focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user?.name}</p>
              <p className="text-[10px] text-ivoirien-orange font-black uppercase tracking-widest">{user?.role}</p>
            </div>
            <Link to={`/${user?.role.toLowerCase()}/profile`} className="w-10 h-10 bg-ivoirien-green rounded-full flex items-center justify-center text-white hover:ring-2 hover:ring-ivoirien-orange transition-all shadow-sm">
              <UserCircle size={24} />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
