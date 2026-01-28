import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sprout, Leaf, Wheat, Droplet, Wind } from "lucide-react";

const CROPS = [
  { id: "wheat", name: "Wheat", emoji: "🌾", color: "from-amber-600 to-amber-700" },
  { id: "rice", name: "Rice", emoji: "🍚", color: "from-emerald-600 to-green-700" },
  { id: "corn", name: "Corn", emoji: "🌽", color: "from-yellow-500 to-yellow-600" },
  { id: "potato", name: "Potato", emoji: "🥔", color: "from-orange-600 to-red-700" },
  { id: "tomato", name: "Tomato", emoji: "🍅", color: "from-red-600 to-red-700" },
  { id: "cotton", name: "Cotton", emoji: "☁️", color: "from-blue-400 to-blue-600" },
];

export default function CropSelection() {
  const [, setLocation] = useLocation();
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const handleCropSelect = (cropId: string) => {
    localStorage.setItem("selectedCrop", cropId);
    setLocation("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Crop Companion
              </h1>
            </div>
          </motion.div>

          <p className="text-slate-300 font-semibold text-lg mb-2">
            Daily Crop Health Monitor
          </p>
          <p className="text-slate-400 text-sm">
            Get instant disease detection • Offline • No login needed
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Instructions */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              What are you growing?
            </h2>
            <p className="text-slate-400">
              Select your primary crop to get started
            </p>
          </div>

          {/* Crop Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CROPS.map((crop, idx) => (
              <motion.button
                key={crop.id}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCropSelect(crop.id)}
                className={`group relative h-40 rounded-2xl border-2 overflow-hidden transition-all duration-300 flex flex-col items-center justify-center gap-3 font-bold ${
                  selectedCrop === crop.id
                    ? "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/50"
                    : "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-slate-200 hover:border-emerald-500/50"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  backgroundImage: selectedCrop === crop.id 
                    ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)"
                    : "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(34,197,94,0.1) 100%)"
                }} />
                <span className="text-5xl group-hover:scale-125 transition-transform duration-300">
                  {crop.emoji}
                </span>
                <span className="text-sm font-semibold relative z-10">{crop.name}</span>
                {selectedCrop === crop.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-white text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-2xl backdrop-blur-sm"
          >
            <p className="text-emerald-300 font-semibold text-sm leading-relaxed">
              ✓ <strong>Disease Detection</strong> • Take a photo to detect crop diseases instantly<br/>
              ✓ <strong>Daily Logging</strong> • Track your crop health every day<br/>
              ✓ <strong>Safety Alerts</strong> • Pesticide withdrawal period countdown<br/>
              ✓ <strong>Weather Forecast</strong> • 3-day weather with disease risk alerts<br/>
              ✓ <strong>Offline</strong> • Works without internet connection
            </p>
          </motion.div>

          {/* CTA Button */}
          {selectedCrop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCropSelect(selectedCrop)}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl text-lg shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/60 transition-all"
            >
              Start with {CROPS.find(c => c.id === selectedCrop)?.name}
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
