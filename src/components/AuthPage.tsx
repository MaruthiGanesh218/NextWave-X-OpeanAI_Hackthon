import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Building2, Users, Shield, Leaf, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthPageProps {
  onAuth: (role: string, name: string) => void;
  onBack: () => void;
  initialRole?: string;
}

const roles = [
  {
    id: 'donor',
    name: 'Donor',
    icon: Heart,
    description: 'Share surplus food with your community',
    color: 'emerald'
  },
  {
    id: 'receiver',
    name: 'NGO/Receiver',
    icon: Building2,
    description: 'Claim food for those in need',
    color: 'green'
  },
  {
    id: 'volunteer',
    name: 'Volunteer',
    icon: Users,
    description: 'Help transport and distribute food',
    color: 'teal'
  },
  {
    id: 'admin',
    name: 'Admin',
    icon: Shield,
    description: 'Monitor and manage the platform',
    color: 'blue'
  }
];

export function AuthPage({ onAuth, onBack, initialRole = 'donor' }: AuthPageProps) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (name && email && password && selectedRole) {
      onAuth(selectedRole, name);
    }
  };

  const handleLogin = () => {
    if (email && password) {
      // pass the user's email as the identifier/name for downstream flows
      onAuth(selectedRole, email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-12 text-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-10 h-10" />
                <h2 className="text-3xl">FOODSHARE</h2>
              </div>
              <p className="text-xl mb-8 text-emerald-100">
                Join our mission to eliminate food waste and feed communities
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100">—</p>
                    <p>Meals Saved</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100">—</p>
                    <p>CO₂ Reduced</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100">—</p>
                    <p>Active Members</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="p-12">
              <h2 className="text-3xl text-gray-900 mb-2">Welcome!</h2>
              <p className="text-gray-600 mb-8">Sign in or create an account to get started</p>

              <Tabs defaultValue="login" className="mb-8">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          className="mt-2"
                        />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    onClick={handleLogin}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6"
                    size="lg"
                  >
                    Sign In
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    onClick={handleSignup}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6"
                    size="lg"
                  >
                    Create Account
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Role Selection */}
              <div>
                <Label className="mb-3 block">Select Your Role</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          selectedRole === role.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${
                          selectedRole === role.id ? 'text-emerald-600' : 'text-gray-400'
                        }`} />
                        <p className={`text-sm ${
                          selectedRole === role.id ? 'text-emerald-900' : 'text-gray-600'
                        }`}>
                          {role.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-center mt-8 text-gray-600">
          By continuing, you agree to FOODSHARE's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
