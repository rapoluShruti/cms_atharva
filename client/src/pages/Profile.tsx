import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, LogOut, Settings, Shield, MapPin, Award } from "lucide-react";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [userInfo] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@farmmail.com",
    phone: "+91-9876-543-210",
    location: "Punjab, India",
    farmSize: "25 acres",
    mainCrops: ["Wheat", "Rice", "Mustard"],
    memberSince: "Jan 2023",
  });

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleLogout = () => {
    // Clear session
    localStorage.removeItem("user");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation("/home")}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Account</p>
            <h1 className="text-lg font-bold text-white">My Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-black text-white">R</span>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-black text-white">{userInfo.name}</h2>
              <p className="text-sm text-emerald-400 font-bold">✓ Verified Farmer</p>
              <p className="text-xs text-slate-400 mt-1">Member since {userInfo.memberSince}</p>
            </div>

            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-black text-emerald-400">{userInfo.mainCrops.length}</p>
            <p className="text-xs text-slate-400 font-bold mt-1">Crops Tracked</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-black text-blue-400">25</p>
            <p className="text-xs text-slate-400 font-bold mt-1">Farm Size (acres)</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-black text-orange-400">12</p>
            <p className="text-xs text-slate-400 font-bold mt-1">Analyses Done</p>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">📋 Contact Information</h3>

          <div className="space-y-3">
            {/* Email */}
            <button
              onClick={() => setSelectedSection(selectedSection === "email" ? null : "email")}
              className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-left hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Email</p>
                    <p className="text-white font-semibold">{userInfo.email}</p>
                  </div>
                </div>
                <span className="text-slate-400">→</span>
              </div>
            </button>

            {/* Phone */}
            <button
              onClick={() => setSelectedSection(selectedSection === "phone" ? null : "phone")}
              className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-left hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Phone</p>
                    <p className="text-white font-semibold">{userInfo.phone}</p>
                  </div>
                </div>
                <span className="text-slate-400">→</span>
              </div>
            </button>

            {/* Location */}
            <button
              onClick={() =>
                setSelectedSection(selectedSection === "location" ? null : "location")
              }
              className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-left hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold">Location</p>
                    <p className="text-white font-semibold">{userInfo.location}</p>
                  </div>
                </div>
                <span className="text-slate-400">→</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Crops Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">🌾 Crops Monitored</h3>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 space-y-2">
            {userInfo.mainCrops.map((crop, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg"
              >
                <span className="font-semibold text-white">{crop}</span>
                <span className="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded-full font-bold">
                  ✓ Active
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-lg font-bold text-white mb-3">⚙️ Settings & Security</h3>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-left hover:border-slate-600 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold text-white">Preferences</span>
              </div>
              <span className="text-slate-400">→</span>
            </button>

            <button className="w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-left hover:border-slate-600 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Privacy & Security</span>
              </div>
              <span className="text-slate-400">→</span>
            </button>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          className="w-full py-4 bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-700/50 text-red-300 font-bold rounded-xl hover:from-red-900 hover:to-red-800 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
    </div>
  );
}
