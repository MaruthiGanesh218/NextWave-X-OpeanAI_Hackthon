import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import NoData from './NoData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, Heart, CheckCircle, TrendingUp, AlertTriangle, Shield, Award, BarChart3, Leaf } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ImpactDashboard } from './ImpactDashboard';

interface AdminDashboardProps {
  userName: string;
}

const weeklyData = [
  { day: 'Mon', donations: 45, claimed: 38, completed: 35 },
  { day: 'Tue', donations: 52, claimed: 45, completed: 42 },
  { day: 'Wed', donations: 48, claimed: 41, completed: 39 },
  { day: 'Thu', donations: 61, claimed: 55, completed: 51 },
  { day: 'Fri', donations: 58, claimed: 52, completed: 48 },
  { day: 'Sat', donations: 72, claimed: 68, completed: 64 },
  { day: 'Sun', donations: 65, claimed: 59, completed: 55 }
];

const foodTypeData = [
  { name: 'Vegetables', value: 35, color: '#10b981' },
  { name: 'Cooked Food', value: 28, color: '#3b82f6' },
  { name: 'Packaged', value: 22, color: '#f59e0b' },
  { name: 'Fruits', value: 15, color: '#ec4899' }
];

const users = [
  { id: 1, name: 'Green Market', role: 'Donor', donations: 45, status: 'verified', points: 450 },
  { id: 2, name: 'City Restaurant', role: 'Donor', donations: 38, status: 'verified', points: 380 },
  { id: 3, name: 'Hope Foundation', role: 'Receiver', claims: 56, status: 'verified', points: 560 },
  { id: 4, name: 'Tech Corp', role: 'Donor', donations: 32, status: 'pending', points: 320 },
  { id: 5, name: 'Care Alliance', role: 'Receiver', claims: 48, status: 'verified', points: 480 }
];

const recentActivity = [
  { id: 1, type: 'donation', user: 'Green Market', action: 'posted Fresh Vegetables', time: '5 min ago' },
  { id: 2, type: 'claim', user: 'Hope Foundation', action: 'claimed Cooked Rice', time: '12 min ago' },
  { id: 3, type: 'complete', user: 'Care Alliance', action: 'completed pickup', time: '25 min ago' },
  { id: 4, type: 'signup', user: 'Local Bakery', action: 'registered as Donor', time: '1 hour ago' },
  { id: 5, type: 'donation', user: 'City Restaurant', action: 'posted Packaged Snacks', time: '2 hours ago' }
];

export function AdminDashboard({ userName }: AdminDashboardProps) {
  const handleVerifyUser = (userId: number) => {
    console.log('Verifying user:', userId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Admin Control Panel 🛡️</h1>
          <p className="text-gray-600">Monitor platform activity and manage users</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-t-4 border-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl text-emerald-600">2,341</p>
                  <p className="text-emerald-600 mt-1">+12% this week</p>
                </div>
                <Users className="w-10 h-10 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Active Donations</p>
                  <p className="text-3xl text-green-600">156</p>
                  <p className="text-green-600 mt-1">Live now</p>
                </div>
                <Heart className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Completed Today</p>
                  <p className="text-3xl text-blue-600">89</p>
                  <p className="text-blue-600 mt-1">+8 from yesterday</p>
                </div>
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Pending Approvals</p>
                  <p className="text-3xl text-amber-600">7</p>
                  <p className="text-amber-600 mt-1">Needs attention</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="impact">
              <Leaf className="w-4 h-4 mr-2" />
              Impact Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Donation flow over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  {weeklyData.length === 0 ? (
                    <NoData message="Weekly activity data is not available" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="donations" fill="#10b981" name="Posted" />
                      <Bar dataKey="claimed" fill="#3b82f6" name="Claimed" />
                      <Bar dataKey="completed" fill="#6366f1" name="Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Food Type Distribution</CardTitle>
                  <CardDescription>By category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={foodTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry: any) => `${entry.name} ${entry.value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {foodTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Real-time platform updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border">
                    {activity.type === 'donation' && <Heart className="w-5 h-5 text-green-600" />}
                    {activity.type === 'claim' && <CheckCircle className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'complete' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                    {activity.type === 'signup' && <Users className="w-5 h-5 text-purple-600" />}
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.user}</p>
                      <p className="text-gray-600">{activity.action}</p>
                    </div>
                    <p className="text-gray-400">{activity.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage and verify platform users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-gray-900">{user.name}</p>
                          {user.status === 'verified' && (
                            <Badge className="bg-green-100 text-green-800">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {user.status === 'pending' && (
                            <Badge className="bg-amber-100 text-amber-800">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600">
                          {user.role} • {user.donations || user.claims} {user.role === 'Donor' ? 'donations' : 'claims'} • {user.points} points
                        </p>
                      </div>
                    </div>
                    {user.status === 'pending' && (
                      <Button
                        onClick={() => handleVerifyUser(user.id)}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Green Market', points: 450, badge: '🥇' },
                  { name: 'Hope Foundation', points: 560, badge: '🥈' },
                  { name: 'City Restaurant', points: 380, badge: '🥉' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{user.badge}</span>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <p className="text-amber-600">{user.points} pts</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Analytics Tab */}
          <TabsContent value="impact">
            <ImpactDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
