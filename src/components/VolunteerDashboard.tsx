import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, Navigation, Clock, CheckCircle, Award, TrendingUp, Package, Heart } from 'lucide-react';

interface VolunteerDashboardProps {
  userName: string;
}

interface DeliveryTask {
  id: string;
  food: string;
  donor: string;
  receiver: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  status: 'available' | 'assigned' | 'completed';
  points: number;
  timeEstimate: string;
}

const tasks: DeliveryTask[] = [
  {
    id: '1',
    food: 'Fresh Vegetables - 15 kg',
    donor: 'Green Market',
    receiver: 'Hope Foundation',
    pickupLocation: 'Downtown Community Center',
    dropoffLocation: 'Hope Center, East Street',
    distance: '3.2 km',
    status: 'available',
    points: 30,
    timeEstimate: '20 min'
  },
  {
    id: '2',
    food: 'Cooked Rice & Curry - 8 kg',
    donor: 'City Restaurant',
    receiver: 'Care Alliance',
    pickupLocation: 'Central Park',
    dropoffLocation: 'Care Center, West Avenue',
    distance: '4.5 km',
    status: 'available',
    points: 40,
    timeEstimate: '25 min'
  },
  {
    id: '3',
    food: 'Packaged Snacks - 100 units',
    donor: 'Tech Corp Office',
    receiver: 'Feed India',
    pickupLocation: 'Tech Park',
    dropoffLocation: 'Community Kitchen, North Road',
    distance: '5.8 km',
    status: 'assigned',
    points: 50,
    timeEstimate: '30 min'
  },
  {
    id: '4',
    food: 'Fresh Fruits - 12 kg',
    donor: 'Farmer\'s Market',
    receiver: 'Shelter Home',
    pickupLocation: 'Market Square',
    dropoffLocation: 'Shelter, South Lane',
    distance: '2.1 km',
    status: 'completed',
    points: 25,
    timeEstimate: '15 min'
  }
];

export function VolunteerDashboard({ userName }: VolunteerDashboardProps) {
  const [deliveryTasks, setDeliveryTasks] = useState<DeliveryTask[]>(tasks);
  const [totalPoints, setTotalPoints] = useState(180);

  const handleAcceptTask = (taskId: string) => {
    setDeliveryTasks(deliveryTasks.map(task => 
      task.id === taskId ? { ...task, status: 'assigned' as const } : task
    ));
  };

  const handleCompleteTask = (taskId: string, points: number) => {
    setDeliveryTasks(deliveryTasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    ));
    setTotalPoints(totalPoints + points);
  };

  const availableTasks = deliveryTasks.filter(t => t.status === 'available');
  const assignedTasks = deliveryTasks.filter(t => t.status === 'assigned');
  const completedTasks = deliveryTasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Welcome, {userName}! 🚗</h1>
          <p className="text-gray-600">Help deliver food to those who need it</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-t-4 border-teal-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Available Tasks</p>
                  <p className="text-3xl text-teal-600">{availableTasks.length}</p>
                </div>
                <Package className="w-10 h-10 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Active Deliveries</p>
                  <p className="text-3xl text-blue-600">{assignedTasks.length}</p>
                </div>
                <Navigation className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl text-emerald-600">{completedTasks.length}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Points</p>
                  <p className="text-3xl text-amber-600">{totalPoints}</p>
                </div>
                <Award className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="available">
              <TabsList className="mb-6">
                <TabsTrigger value="available">
                  Available ({availableTasks.length})
                </TabsTrigger>
                <TabsTrigger value="assigned">
                  My Deliveries ({assignedTasks.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedTasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4">
                {availableTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onAccept={() => handleAcceptTask(task.id)}
                  />
                ))}
                {availableTasks.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center text-gray-500">
                      No available tasks at the moment. Check back soon!
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="assigned" className="space-y-4">
                {assignedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={() => handleCompleteTask(task.id, task.points)}
                  />
                ))}
                {assignedTasks.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center text-gray-500">
                      You don't have any active deliveries. Accept a task to get started!
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Keep up the great work!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Next Badge</span>
                    <span className="text-gray-900">75%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 w-[75%]"></div>
                  </div>
                  <p className="text-gray-500 mt-2">5 more deliveries to "Delivery Hero" 🚀</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-gray-600 mb-2">Volunteer Rank</p>
                  <p className="text-3xl text-teal-600">#15</p>
                  <p className="text-gray-500 mt-1">Top 10% this week</p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-gray-600 mb-3">Your Badges</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                      <span className="text-2xl">🤝</span>
                      <div>
                        <p className="text-gray-900">Helping Hand</p>
                        <p className="text-gray-600">10+ deliveries</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-2xl">🚗</span>
                      <div>
                        <p className="text-gray-900">Road Warrior</p>
                        <p className="text-gray-600">50+ km covered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Volunteers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  Top Volunteers
                </CardTitle>
                <CardDescription>This week's leaders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { rank: 1, name: 'Priya Sharma', deliveries: 28, badge: '🥇' },
                  { rank: 2, name: 'Rahul Kumar', deliveries: 24, badge: '🥈' },
                  { rank: 3, name: 'Ananya Reddy', deliveries: 21, badge: '🥉' },
                  { rank: 15, name: userName, deliveries: 12, badge: '🏅', highlight: true }
                ].map((volunteer) => (
                  <div
                    key={volunteer.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      volunteer.highlight
                        ? 'bg-teal-50 border border-teal-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{volunteer.badge}</span>
                      <div>
                        <p className="text-gray-900">#{volunteer.rank} {volunteer.name}</p>
                        <p className="text-gray-600">{volunteer.deliveries} deliveries</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card className="bg-gradient-to-br from-emerald-600 to-green-700 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-emerald-100">Meals Delivered</p>
                  <p className="text-3xl">142</p>
                </div>
                <div>
                  <p className="text-emerald-100">Distance Covered</p>
                  <p className="text-3xl">87 km</p>
                </div>
                <div>
                  <p className="text-emerald-100">CO₂ Saved</p>
                  <p className="text-3xl">58 kg</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ 
  task, 
  onAccept, 
  onComplete 
}: { 
  task: DeliveryTask; 
  onAccept?: () => void; 
  onComplete?: () => void; 
}) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    assigned: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-gray-900 mb-2">{task.food}</h3>
            <Badge className={statusColors[task.status]}>
              {task.status === 'available' && 'Available Now'}
              {task.status === 'assigned' && 'In Progress'}
              {task.status === 'completed' && 'Completed'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-amber-600">+{task.points}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600 mb-1">Pickup from:</p>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-gray-900">{task.donor}</p>
                <p className="text-gray-600">{task.pickupLocation}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-px h-8 bg-gray-300"></div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600 mb-1">Deliver to:</p>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-gray-900">{task.receiver}</p>
                <p className="text-gray-600">{task.dropoffLocation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            <span>{task.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>~{task.timeEstimate}</span>
          </div>
        </div>

        {onAccept && task.status === 'available' && (
          <Button onClick={onAccept} className="w-full bg-teal-600 hover:bg-teal-700">
            <Package className="w-4 h-4 mr-2" />
            Accept Delivery
          </Button>
        )}

        {onComplete && task.status === 'assigned' && (
          <Button onClick={onComplete} className="w-full bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Completed
          </Button>
        )}

        {task.status === 'completed' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
            <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-emerald-800">Successfully delivered!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
