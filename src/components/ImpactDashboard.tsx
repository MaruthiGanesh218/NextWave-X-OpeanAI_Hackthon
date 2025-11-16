import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import NoData from './NoData';
import { Leaf, Heart, Users, TrendingUp, Award, MapPin } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data arrays are intentionally empty by default — wire real data from the backend
const monthlyImpact: Array<{ month?: string; meals?: number; co2?: number; donors?: number; receivers?: number }> = [];
const wasteReduction: Array<{ category?: string; saved?: number; wasted?: number }> = [];
const regionalData: Array<{ area?: string; donations?: number; impact?: number }> = [];

// Derived display values (show neutral placeholders when no data)
const totalMeals = monthlyImpact.reduce((s, m) => s + (m.meals || 0), 0);
const totalCo2 = monthlyImpact.reduce((s, m) => s + (m.co2 || 0), 0);
const activeCommunity = monthlyImpact.reduce((s, m) => s + ((m.donors || 0) + (m.receivers || 0)), 0);
const wasteSuccess = 0; // percent placeholder — compute when real data is available
const displayTotalMeals = totalMeals ? totalMeals.toLocaleString() : '—';
const displayTotalCo2 = totalCo2 ? `${totalCo2.toLocaleString()} kg` : '—';
const displayActiveCommunity = activeCommunity ? activeCommunity.toLocaleString() : '—';
const displayWasteSuccess = wasteSuccess ? `${wasteSuccess}%` : '—';

export function ImpactDashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Leaf className="w-12 h-12" />
          <div>
            <h2 className="text-3xl">Global Impact Dashboard</h2>
            <p className="text-emerald-100">Real-time sustainability metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8" />
              <p className="text-emerald-100">Total Meals Saved</p>
            </div>
            <p className="text-4xl mb-2">{displayTotalMeals}</p>
            <p className="text-emerald-200">&nbsp;</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-8 h-8" />
              <p className="text-emerald-100">CO₂ Reduced</p>
            </div>
            <p className="text-4xl mb-2">{displayTotalCo2}</p>
            <p className="text-emerald-200">&nbsp;</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8" />
              <p className="text-emerald-100">Active Community</p>
            </div>
            <p className="text-4xl mb-2">{displayActiveCommunity}</p>
            <p className="text-emerald-200">Donors & Receivers</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8" />
              <p className="text-emerald-100">Waste Prevented</p>
            </div>
            <p className="text-4xl mb-2">{displayWasteSuccess}</p>
            <p className="text-emerald-200">Success rate</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
  {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Monthly Growth Trends
            </CardTitle>
            <CardDescription>Meals saved and CO₂ reduced over time</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyImpact.length === 0 ? (
              <NoData message="Monthly growth data is not available" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyImpact}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="meals"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorMeals)"
                  name="Meals Saved"
                />
                <Area
                  type="monotone"
                  dataKey="co2"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorCO2)"
                  name="CO₂ Reduced (kg)"
                />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Community Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Community Participation
            </CardTitle>
            <CardDescription>Active donors and receivers</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyImpact.length === 0 ? (
              <NoData message="Community participation data is not available" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyImpact}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="donors"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Active Donors"
                  dot={{ fill: '#10b981', r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="receivers"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Active Receivers"
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Waste Reduction by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Food Waste Prevention
            </CardTitle>
            <CardDescription>Saved vs. potential waste by category</CardDescription>
          </CardHeader>
          <CardContent>
            {wasteReduction.length === 0 ? (
              <NoData message="Waste reduction data is not available" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteReduction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="saved" fill="#10b981" name="Saved (kg)" />
                <Bar dataKey="wasted" fill="#ef4444" name="Still Wasted (kg)" />
              </BarChart>
            </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Regional Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Regional Activity
            </CardTitle>
            <CardDescription>Donations by area</CardDescription>
          </CardHeader>
          <CardContent>
            {regionalData.length === 0 ? (
              <NoData message="Regional activity data is not available" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="area" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="donations" fill="#8b5cf6" name="Total Donations" />
                <Bar dataKey="impact" fill="#10b981" name="Impact Score" />
              </BarChart>
            </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* UN SDG Impact */}
      <Card className="border-2 border-emerald-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-600" />
            UN Sustainable Development Goals Impact
          </CardTitle>
          <CardDescription>Supporting SDG Goal 12: Responsible Consumption and Production</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h4 className="text-gray-900 mb-3">🌍 Environmental Impact</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• CO₂ emissions prevented (computed from live data)</li>
                <li>• Meals diverted from landfills</li>
                <li>• Waste reduction success rate</li>
                <li>• Environmental equivalencies</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-gray-900 mb-3">🤝 Social Impact</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Active community members and organizations</li>
                <li>• NGOs and receivers supported</li>
                <li>• People reached via donations</li>
                <li>• Community satisfaction metrics</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h4 className="text-gray-900 mb-3">📊 Economic Impact</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Economic value redistributed</li>
                <li>• Active donors and partners</li>
                <li>• Avg. value per donation (computed)</li>
                <li>• Cost-efficiency metrics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
        <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <div className="text-4xl mb-3">🏆</div>
            <h4 className="text-gray-900 mb-2">Partner Highlight</h4>
            <p className="text-gray-700 mb-2">Local partner supported community distribution efforts</p>
            <p className="text-emerald-600">Impact details available in reports</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="pt-6">
            <div className="text-4xl mb-3">💚</div>
            <h4 className="text-gray-900 mb-2">Community Spotlight</h4>
            <p className="text-gray-700 mb-2">Organizations and volunteers driving local impact</p>
            <p className="text-blue-600">See detailed metrics when connected to data</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="text-4xl mb-3">🚀</div>
            <h4 className="text-gray-900 mb-2">Growth Trends</h4>
            <p className="text-gray-700 mb-2">Insights on participation and regional growth</p>
            <p className="text-purple-600">Connect real data to visualize trends</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
