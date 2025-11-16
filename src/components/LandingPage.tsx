import { Leaf, Users, MapPin, TrendingUp, Award, Shield, Clock, Heart, UtensilsCrossed } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface LandingPageProps {
  onNavigate: (page: string, role?: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <UtensilsCrossed className="w-12 h-12" />
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                FOODSHARE
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-semibold">
              Turning Surplus into Sustainability
            </p>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              AI-powered platform connecting food donors, NGOs, and volunteers to eliminate food waste and feed communities in real-time.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Button
                onClick={() => onNavigate('auth', 'donor')}
                size="lg"
                className="inline-flex items-center bg-white text-emerald-700 hover:bg-emerald-50 hover:scale-105 transition-all duration-200 px-8 py-4 rounded-xl shadow-md hover:shadow-lg font-semibold text-lg"
              >
                <Heart className="w-6 h-6 mr-3" />
                Donate Now
              </Button>
              <Button
                onClick={() => onNavigate('auth', 'receiver')}
                size="lg"
                className="inline-flex items-center bg-white text-emerald-700 hover:bg-emerald-50 hover:scale-105 transition-all duration-200 px-8 py-4 rounded-xl shadow-md hover:shadow-lg font-semibold text-lg"
              >
                <MapPin className="w-6 h-6 mr-3" />
                Find Food
              </Button>
            </div>
          </motion.div>
        </div>
        {/* Clean Straight Bottom Edge */}
        <div className="w-full h-6 bg-white"></div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base md:text-lg font-medium text-gray-600 mb-2">Meals Saved</p>
                <p className="text-2xl md:text-3xl font-semibold text-emerald-600">23</p>
              </div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base md:text-lg font-medium text-gray-600 mb-2">CO₂ Reduced (kg)</p>
                <p className="text-2xl md:text-3xl font-semibold text-green-600">8</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base md:text-lg font-medium text-gray-600 mb-2">Active Donors</p>
                <p className="text-2xl md:text-3xl font-semibold text-green-600">68</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4 font-bold uppercase">HOW IT WORKS</h2>
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 max-w-3xl mx-auto uppercase">
            THREE SIMPLE STEPS TO TURN FOOD SURPLUS INTO COMMUNITY SUPPORT
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            tabIndex={0}
            className="w-full"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 ease-out flex flex-col items-center justify-center aspect-square">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-center text-gray-900 mb-4 font-semibold uppercase text-xl">DONORS POST FOOD</h3>
              <p className="text-gray-600 text-center">
                Share surplus food with photos, location, and expiry details. AI detects food type instantly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            tabIndex={0}
            className="w-full"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 ease-out flex flex-col items-center justify-center aspect-square">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-center text-gray-900 mb-4 font-semibold uppercase text-xl">NGOS CLAIM FOOD</h3>
              <p className="text-gray-600 text-center">
                View real-time map of nearby donations. Click, claim, and coordinate pickup instantly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            tabIndex={0}
            className="w-full"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 ease-out flex flex-col items-center justify-center aspect-square">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-center text-gray-900 mb-4 font-semibold uppercase text-xl">TRACK IMPACT</h3>
              <p className="text-gray-600 text-center">
                Monitor meals saved, earn badges, and see your environmental impact in real-time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-emerald-50 to-green-50 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Why FOODSHARE?</h2>
            <p className="text-gray-600">Powered by AI, driven by community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 items-stretch">
            <motion.div
              initial={{ y: 6, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.995 }}
              className="h-full"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md min-h-[260px] md:min-h-[300px] lg:min-h-[330px] flex flex-col justify-between transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl h-full">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <Clock className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Real-Time Matching</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-2">AI-powered smart matching connects donors and receivers instantly</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 6, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.995 }}
              className="h-full"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md min-h-[260px] md:min-h-[300px] lg:min-h-[330px] flex flex-col justify-between transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl h-full">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <Shield className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Verified & Safe</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-2">Admin-verified donors and freshness prediction ensure food safety</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 6, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.995 }}
              className="h-full"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md min-h-[260px] md:min-h-[300px] lg:min-h-[330px] flex flex-col justify-between transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl h-full">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <Award className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Gamified Rewards</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-2">Earn points, badges, and climb leaderboards for every donation</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 6, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.995 }}
              className="h-full"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md min-h-[260px] md:min-h-[300px] lg:min-h-[330px] flex flex-col justify-between transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl h-full">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Impact Analytics</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-2">Track meals saved, CO₂ reduced, and community impact</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* UN SDG Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl py-12 md:py-16 px-12 text-white text-center">
          <UtensilsCrossed className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 text-white" />
          <h2 className="text-3xl mb-4">Supporting UN SDG Goal 12</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            Responsible Consumption & Sustainable Production
          </p>
          <p className="text-emerald-50 max-w-2xl mx-auto">
            Every meal shared through FOODSHARE helps cut down food waste, reduce carbon emissions, and support vulnerable communities. Together, we're creating a sustainable cycle where surplus food becomes meaningful impact.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-6 h-6" />
                <span className="text-xl">FOODSHARE</span>
              </div>
              <p className="text-gray-400">Green Technology & Community Sustainability</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-emerald-400 mb-1">Developed by Team SYNTAXIA</p>
              <p className="text-gray-400">OpenAI & NxtWave - GenAI Buildathon 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
