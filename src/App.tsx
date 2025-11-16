import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { DonorDashboard } from './components/DonorDashboard';
import { ReceiverDashboard } from './components/ReceiverDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Navbar } from './components/Navbar';

type Page = 'landing' | 'auth' | 'dashboard';

interface UserState {
  isAuthenticated: boolean;
  role: string;
  name: string;
  points: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedRole, setSelectedRole] = useState<string>('donor');
  const [user, setUser] = useState<UserState>({
    isAuthenticated: false,
    role: '',
    name: '',
    points: 0
  });

  const handleAuth = (role: string, name: string) => {
    const initialPoints = {
      donor: 120,
      receiver: 245,
      volunteer: 180,
      admin: 999
    };

    setUser({
      isAuthenticated: true,
      role,
      name,
      points: initialPoints[role as keyof typeof initialPoints] || 0
    });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser({
      isAuthenticated: false,
      role: '',
      name: '',
      points: 0
    });
    setCurrentPage('landing');
  };

  const handleNavigate = (page: string, role?: string) => {
    if (page === 'auth') {
      if (role) {
        setSelectedRole(role);
      }
      setCurrentPage('auth');
    } else if (page === 'landing') {
      setCurrentPage('landing');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {user.isAuthenticated && (
        <Navbar
          userName={user.name}
          userRole={user.role}
          points={user.points}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'landing' && (
        <LandingPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'auth' && (
        <AuthPage
          onAuth={handleAuth}
          onBack={() => setCurrentPage('landing')}
          initialRole={selectedRole}
        />
      )}

      {currentPage === 'dashboard' && user.isAuthenticated && (
        <>
          {user.role === 'donor' && (
            <DonorDashboard userName={user.name} />
          )}
          {user.role === 'receiver' && (
            <ReceiverDashboard userName={user.name} />
          )}
          {user.role === 'volunteer' && (
            <VolunteerDashboard userName={user.name} />
          )}
          {user.role === 'admin' && (
            <AdminDashboard userName={user.name} />
          )}
        </>
      )}
    </div>
  );
}
