import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Heart, Clock, TrendingUp, Award, Navigation, CheckCircle } from 'lucide-react';
import L from 'leaflet';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReceiverDashboardProps {
  userName: string;
}

interface FoodListing {
  id: string;
  name: string;
  donor: string;
  type: string;
  quantity: string;
  expiry: string;
  location: string;
  coordinates: [number, number];
  distance: string;
  image?: string;
  freshness: string;
  points: number;
}

const foodListings: FoodListing[] = [
  {
    id: '1',
    name: 'Fresh Vegetables',
    donor: 'Green Market',
    type: 'Vegetables',
    quantity: '15 kg',
    expiry: '2 days',
    location: 'Downtown Community Center',
    coordinates: [17.385, 78.486],
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?w=400',
    freshness: 'Safe for next 48 hours',
    points: 50
  },
  {
    id: '2',
    name: 'Cooked Rice & Curry',
    donor: 'City Restaurant',
    type: 'Cooked Food',
    quantity: '8 kg',
    expiry: '5 hours',
    location: 'Central Park',
    coordinates: [17.395, 78.476],
    distance: '2.1 km',
    freshness: 'Safe for next 5 hours',
    points: 40
  },
  {
    id: '3',
    name: 'Packaged Snacks',
    donor: 'Tech Corp Office',
    type: 'Packaged',
    quantity: '100 units',
    expiry: '30 days',
    location: 'Tech Park',
    coordinates: [17.375, 78.496],
    distance: '3.5 km',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400',
    freshness: 'Safe for next 30 days',
    points: 60
  },
  {
    id: '4',
    name: 'Fresh Fruits',
    donor: 'Farmer\'s Market',
    type: 'Fruits',
    quantity: '12 kg',
    expiry: '3 days',
    location: 'Market Square',
    coordinates: [17.365, 78.486],
    distance: '1.8 km',
    freshness: 'Safe for next 72 hours',
    points: 45
  },
  {
    id: '5',
    name: 'Bread & Bakery Items',
    donor: 'Local Bakery',
    type: 'Bakery',
    quantity: '50 pieces',
    expiry: '1 day',
    location: 'Main Street',
    coordinates: [17.390, 78.490],
    distance: '0.8 km',
    freshness: 'Safe for next 24 hours',
    points: 35
  }
];

export function ReceiverDashboard({ userName }: ReceiverDashboardProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedListing, setSelectedListing] = useState<FoodListing | null>(null);
  const [claimedListings, setClaimedListings] = useState<string[]>([]);
  const [organizationPoints, setOrganizationPoints] = useState(245);
  const [totalClaimed, setTotalClaimed] = useState(18);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Fix Leaflet's default icon path issue
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDEuMyAwLjIgMi42IDAuNyAzLjhsMTEuOCAyNC43IDExLjgtMjQuN2MwLjQtMS4yIDAuNy0yLjUgMC43LTMuOEMyNSA1LjYgMTkuNCAwIDEyLjUgMHoiIGZpbGw9IiMzMzg4ZmYiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIuNSIgcj0iNyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDEuMyAwLjIgMi42IDAuNyAzLjhsMTEuOCAyNC43IDExLjgtMjQuN2MwLjQtMS4yIDAuNy0yLjUgMC43LTMuOEMyNSA1LjYgMTkuNCAwIDEyLjUgMHoiIGZpbGw9IiMzMzg4ZmYiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIuNSIgcj0iNyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
      shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S5qqf1TobSy9fRrvoJ8dpfxMV2m6/s3JWJOnf/f5ZSlHBkN0NDvM3P5r5w1xLpKJL8UXnSm1gPnGfAjzaLOyVG4/t/BT5rqPzZa8F/OXvTCRSb8mxCnlzbNh3fNwLgPjb8bKkH9kRi6dJGaM+pJJ0Jk48xxW8nE6Umt7zPjy0T9lwPDYJtQ1TBE+9WYhEaLmWfWgLQQPxFhowqJTW5FkFLSF6HZdFJ4VJJdHB0wKGMBvYFYWcFhiPEXY0eTaWUqEPTFZLGMhGiIrSG4rQQJDZwaPGEwCwGNwWNB8MGMHXOAMRC1zVjGoQ3xqHRj14o9Sd3zGBPxwKMQWEKdoTN0BHFKwGhYePvFwpABHwEU1CuwNL4BhBfQhAUhzn3lIZMCv4gFvZVXewEEPJRQ+vQdxgJJzZVbxP4F3Tt+mKwDfQO8vmGdUDwqJ9qFZOowNJpxPbA8TVXiK8AbU3VJhPkqKpKJzLGOeKbVLf8zB0xDXPXJNvHn7PaQCnXFVcgr1zzpQD2hzhICaVaJJPcYtjHywYHhbJqjHKZsVhUjJR2NUBDUe3hwj4JhHHKJUhIJmfXwwNDQIJBCJhjUSweLJ1x+Cj50LRwKjJwCDxLs0iKIxuIFJMlXZQKqpIw5OsF0fgJF8+YWpg2oP8Rw+jJnS0Y09TmnVdaSH7PcwJqPRkQu0S7/C+MYHbg+QWJlCxHPNR7vmOqaIqILKRXDlbG9Pbs3KPdFPZ+Niv5uJz+48f5b+lnpPztgAAAABJRU5ErkJggg==',
    });

    // Initialize map
    const map = L.map(mapRef.current).setView([17.385, 78.486], 13);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom marker icon
    const greenIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: #10b981;
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    // Add markers for each food listing
    foodListings.forEach((listing) => {
      const marker = L.marker(listing.coordinates, { icon: greenIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: system-ui; min-width: 200px;">
            <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 8px 0; color: #1f2937;">
              ${listing.name}
            </h3>
            <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
              <strong>Donor:</strong> ${listing.donor}
            </p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
              <strong>Quantity:</strong> ${listing.quantity}
            </p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
              <strong>Distance:</strong> ${listing.distance}
            </p>
            <div style="margin-top: 8px; padding: 6px; background: #d1fae5; border-radius: 4px;">
              <p style="margin: 0; color: #065f46; font-size: 13px;">🌿 ${listing.freshness}</p>
            </div>
          </div>
        `);

      marker.on('click', () => {
        setSelectedListing(listing);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleClaimFood = (listingId: string, points: number) => {
    setClaimedListings([...claimedListings, listingId]);
    setOrganizationPoints(organizationPoints + points);
    setTotalClaimed(totalClaimed + 1);
    setSelectedListing(null);
  };

  const availableListings = foodListings.filter(l => !claimedListings.includes(l.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">{userName} Dashboard 🏢</h1>
          <p className="text-gray-600">Find and claim food donations near you</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-t-4 border-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Available Now</p>
                  <p className="text-3xl text-green-600">{availableListings.length}</p>
                </div>
                <MapPin className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-emerald-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Claimed</p>
                  <p className="text-3xl text-emerald-600">{totalClaimed}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Your Points</p>
                  <p className="text-3xl text-amber-600">{organizationPoints}</p>
                </div>
                <Award className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">NGO Rank</p>
                  <p className="text-3xl text-blue-600">#8</p>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map View */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-green-600" />
                  Live Food Donation Map
                </CardTitle>
                <CardDescription>
                  Click on green markers to view details and claim food
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  ref={mapRef}
                  className="w-full h-[600px]"
                  style={{ background: '#f0f0f0' }}
                ></div>
              </CardContent>
            </Card>
          </div>

          {/* Listing Details / List View */}
          <div className="space-y-6">
            {selectedListing ? (
              <Card className="border-2 border-green-500">
                <CardHeader>
                  <CardTitle>Selected Donation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedListing.image && (
                    <ImageWithFallback
                      src={selectedListing.image}
                      alt={selectedListing.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  
                  <div>
                    <h3 className="text-gray-900 mb-2">{selectedListing.name}</h3>
                    <Badge className="bg-green-100 text-green-800">
                      {selectedListing.type}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>Donor: {selectedListing.donor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Quantity: {selectedListing.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedListing.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      <span>{selectedListing.distance} away</span>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800">🌿 {selectedListing.freshness}</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800">⏰ Expires in: {selectedListing.expiry}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Earn Points:</span>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span className="text-amber-600">+{selectedListing.points}</span>
                      </div>
                    </div>
                    
                    {claimedListings.includes(selectedListing.id) ? (
                      <Button disabled className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Already Claimed
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleClaimFood(selectedListing.id, selectedListing.points)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Claim This Food
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Available Donations</CardTitle>
                  <CardDescription>
                    {availableListings.length} donations nearby
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                  {availableListings.map((listing) => (
                    <button
                      key={listing.id}
                      onClick={() => setSelectedListing(listing)}
                      className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 transition-all hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        {listing.image && (
                          <ImageWithFallback
                            src={listing.image}
                            alt={listing.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-gray-900 mb-1">{listing.name}</p>
                          <p className="text-gray-600">{listing.quantity}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {listing.distance}
                            </Badge>
                            <Badge className="bg-amber-100 text-amber-800 text-xs">
                              +{listing.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Top NGOs</CardTitle>
                <CardDescription>This month's leaderboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { rank: 1, name: 'Hope Foundation', points: 856, badge: '🥇' },
                  { rank: 2, name: 'Care Alliance', points: 742, badge: '🥈' },
                  { rank: 3, name: 'Feed India', points: 698, badge: '🥉' },
                  { rank: 8, name: userName, points: organizationPoints, badge: '🏅', highlight: true }
                ].map((org) => (
                  <div
                    key={org.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      org.highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{org.badge}</span>
                      <div>
                        <p className="text-gray-900">#{org.rank} {org.name}</p>
                        <p className="text-gray-600">{org.points} points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
