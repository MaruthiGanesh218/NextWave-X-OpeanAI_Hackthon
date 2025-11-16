import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Upload, Heart, CheckCircle, Clock, Award, TrendingUp, Camera, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DonorDashboardProps {
  userName: string;
}

interface FoodDonation {
  id: string;
  name: string;
  type: string;
  quantity: string;
  expiry: string;
  location: string;
  status: 'active' | 'claimed' | 'completed';
  image?: string;
  aiDetection?: string;
  freshness?: string;
  points: number;
  claimedBy?: string;
}

interface NewDonation {
  name: string;
  type: string;
  quantity: string;
  expiry: string;
  location: string;
  description?: string;
}

const badges = [
  { id: 1, name: 'Top Contributor', icon: '🏅', earned: true, description: '10+ donations' },
  { id: 2, name: 'Green Partner', icon: '💚', earned: true, description: '5+ active donations' },
  { id: 3, name: 'Helping Hand', icon: '🤝', earned: false, description: '50+ donations' },
  { id: 4, name: 'Community Hero', icon: '⭐', earned: false, description: '100+ donations' },
];

export function DonorDashboard({ userName }: DonorDashboardProps) {
  const [donations, setDonations] = useState<FoodDonation[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDonation, setNewDonation] = useState<NewDonation>({
    name: '',
    type: '',
    quantity: '',
    expiry: '',
    location: '',
    description: ''
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiDetecting, setAiDetecting] = useState(false);

  const totalPoints = donations.reduce((sum: number, d: FoodDonation) => sum + (d.points || 0), 0);
  const activeDonations = donations.filter((d: FoodDonation) => d.status === 'active').length;
  const completedDonations = donations.filter((d: FoodDonation) => d.status === 'completed').length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        // Simulate AI detection
        setAiDetecting(true);
        setTimeout(() => {
            setAiDetecting(false);
            setNewDonation((prev: NewDonation) => ({ ...prev, type: 'Vegetables' }));
          }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitDonation = () => {
    if (newDonation.name && newDonation.type && newDonation.quantity && newDonation.location) {
      const donation: FoodDonation = {
        id: Date.now().toString(),
        name: newDonation.name,
        type: newDonation.type,
        quantity: newDonation.quantity,
        expiry: newDonation.expiry,
        location: newDonation.location,
        status: 'active',
        image: uploadedImage || undefined,
        aiDetection: newDonation.type,
        freshness: 'Safe for consumption',
        points: 40
      };
      setDonations([donation, ...donations]);
      setShowAddForm(false);
      setNewDonation({ name: '', type: '', quantity: '', expiry: '', location: '', description: '' });
      setUploadedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-gray-600">Track your donations and make a difference</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-t-4 border-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Points</p>
                  <p className="text-3xl text-emerald-600">{totalPoints}</p>
                </div>
                <Award className="w-10 h-10 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Active</p>
                  <p className="text-3xl text-green-600">{activeDonations}</p>
                </div>
                <Clock className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl text-blue-600">{completedDonations}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Rank</p>
                  <p className="text-3xl text-purple-600">#12</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Donation Button */}
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            size="lg"
            className="mb-8 bg-emerald-600 hover:bg-emerald-700"
          >
            <Heart className="w-5 h-5 mr-2" />
            Add New Donation
          </Button>
        )}

        {/* Add Donation Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="border-2 border-emerald-500">
              <CardHeader>
                <CardTitle>Add New Food Donation</CardTitle>
                <CardDescription>Share your surplus food with the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload with AI Detection */}
                <div>
                  <Label>Upload Food Image (AI Detection Enabled)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
                    {uploadedImage ? (
                      <div className="relative">
                        <ImageWithFallback
                          src={uploadedImage}
                          alt="Uploaded food"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        {aiDetecting && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <div className="text-white text-center">
                              <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                              <p>AI Detecting Food Type...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">Click to upload food image</p>
                        <p className="text-gray-400">AI will automatically detect food type</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="food-name">Food Name</Label>
                    <Input
                      id="food-name"
                      placeholder="Food name"
                      value={newDonation.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonation({ ...newDonation, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="food-type">Food Type</Label>
                    <Select
                      value={newDonation.type}
                      onValueChange={(value: string) => setNewDonation({ ...newDonation, type: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Cooked Food">Cooked Food</SelectItem>
                        <SelectItem value="Packaged">Packaged Food</SelectItem>
                        <SelectItem value="Dairy">Dairy Products</SelectItem>
                        <SelectItem value="Bakery">Bakery Items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      placeholder="Quantity (units and measurement)"
                      value={newDonation.quantity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonation({ ...newDonation, quantity: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expiry">Expiry/Best Before</Label>
                    <Input
                      id="expiry"
                      placeholder="Expiry or best-before"
                      value={newDonation.expiry}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonation({ ...newDonation, expiry: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Pickup Location</Label>
                  <Input
                    id="location"
                    placeholder="Pickup location (address)"
                    value={newDonation.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDonation({ ...newDonation, location: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Additional Details (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details (optional)"
                    value={newDonation.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDonation({ ...newDonation, description: e.target.value })}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSubmitDonation} className="bg-emerald-600 hover:bg-emerald-700">
                    Submit Donation
                  </Button>
                  <Button onClick={() => setShowAddForm(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donations List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="active">
              <TabsList className="mb-6">
                <TabsTrigger value="active">Active ({activeDonations})</TabsTrigger>
                <TabsTrigger value="claimed">Claimed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {donations.filter((d: FoodDonation) => d.status === 'active').map((donation: FoodDonation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
              </TabsContent>

              <TabsContent value="claimed" className="space-y-4">
                {donations.filter((d: FoodDonation) => d.status === 'claimed').map((donation: FoodDonation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {donations.filter((d: FoodDonation) => d.status === 'completed').map((donation: FoodDonation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Badges & Leaderboard */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements unlocked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      badge.earned ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50 opacity-50'
                    }`}
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-900">{badge.name}</p>
                      <p className="text-gray-600">{badge.description}</p>
                    </div>
                    {badge.earned && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Next Badge</span>
                    <span className="text-gray-900">60%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 w-[60%]"></div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-gray-600 mb-2">Community Rank</p>
                  <p className="text-3xl text-emerald-600">#12</p>
                  <p className="text-gray-500 mt-1">Top 5% of donors</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonationCard({ donation }: { donation: FoodDonation }) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    claimed: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {donation.image && (
            <ImageWithFallback
              src={donation.image}
              alt={donation.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-gray-900 mb-1">{donation.name}</h3>
                {donation.aiDetection && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    AI: {donation.aiDetection}
                  </Badge>
                )}
              </div>
              <Badge className={statusColors[donation.status]}>
                {donation.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{donation.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{donation.quantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Expires: {donation.expiry}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{donation.location}</span>
              </div>
            </div>

            {donation.freshness && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-2">
                <p className="text-green-800">🌿 {donation.freshness}</p>
              </div>
            )}

            {donation.claimedBy && (
              <p className="text-gray-600">
                Claimed by: <span className="text-emerald-600">{donation.claimedBy}</span>
              </p>
            )}

            <div className="flex items-center gap-2 mt-3">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-amber-600">+{donation.points} points</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
