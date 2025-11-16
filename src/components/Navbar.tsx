import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Leaf, LogOut, User, Award } from 'lucide-react';

interface NavbarProps {
  userName: string;
  userRole: string;
  points: number;
  onLogout: () => void;
}

export function Navbar({ userName, userRole, points, onLogout }: NavbarProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'donor':
        return 'bg-emerald-100 text-emerald-800';
      case 'receiver':
        return 'bg-green-100 text-green-800';
      case 'volunteer':
        return 'bg-teal-100 text-teal-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'donor':
        return 'Donor';
      case 'receiver':
        return 'NGO';
      case 'volunteer':
        return 'Volunteer';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-gray-900">FOODSHARE</h1>
              <p className="text-gray-500 -mt-1">Sustainability Platform</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {/* Points Display */}
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
              <Award className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800">{points}</span>
              <span className="text-amber-600">points</span>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden md:block">
                <p className="text-gray-900">{userName}</p>
                <Badge className={`${getRoleBadgeColor(userRole)} text-xs`}>
                  {getRoleLabel(userRole)}
                </Badge>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              onClick={onLogout}
              variant="ghost"
              className="hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
