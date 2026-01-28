import { useLocation } from "wouter";
import { useHistory, useAnalyzeImage } from "@/hooks/use-analysis";
import { FileUpload } from "@/components/ui/FileUpload";
import {
  Clock,
  Loader2,
  TrendingUp,
  AlertTriangle,
  Menu,
  X,
  Leaf,
  ChevronRight,
  Zap,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: history, isLoading: historyLoading } = useHistory();
  const { mutate: analyze, isPending: isAnalyzing } = useAnalyzeImage();
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const selectedCrop = localStorage.getItem("selectedCrop") || "wheat";

  const handleFileSelect = (base64: string) => {
    analyze(
      { image: base64 },
      {
        onSuccess: (data) => {
          sessionStorage.setItem("lastAnalysis", JSON.stringify({ result: data, image: base64 }));
          setLocation("/analysis/current");
        },
      }
    );
  };

  // Quick menu items
  const quickMenuItems = [
    {
      id: "logging",
      title: "Daily Log",
      icon: "📝",
      color: "from-blue-600 to-cyan-600",
      action: () => setLocation("/logging"),
    },
    {
      id: "safety",
      title: "Pesticide Safety",
      icon: "⚠️",
      color: "from-red-600 to-rose-600",
      action: () => setLocation("/withdrawal"),
    },
    {
      id: "weather",
      title: "Weather Alerts",
      icon: "🌧️",
      color: "from-purple-600 to-blue-600",
      action: () => setLocation("/weather"),
    },
    {
      id: "schemes",
      title: "Govt. Schemes",
      icon: "🎁",
      color: "from-yellow-600 to-orange-600",
      action: () => setLocation("/schemes"),
    },
    {
      id: "help",
      title: "Get Help",
      icon: "☎️",
      color: "from-pink-600 to-rose-600",
      action: () => setLocation("/helpline"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Premium Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/80"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Crop Companion</p>
              <h1 className="text-lg font-bold text-white capitalize flex items-center gap-2">
                {selectedCrop}
                <Zap className="w-4 h-4 text-emerald-400" />
              </h1>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300"
          >
            {showQuickMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </motion.div>

      {/* Side Menu */}
      {showQuickMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowQuickMenu(false)}
        >
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-slate-800 to-slate-900 w-80 h-full p-6 border-r border-slate-700 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Menu</h2>

            <div className="space-y-2 flex-1">
              {quickMenuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    item.action();
                    setShowQuickMenu(false);
                  }}
                  className="w-full p-4 text-left rounded-lg bg-slate-700/50 hover:bg-slate-600 transition-all duration-200 text-white font-semibold flex items-center gap-4 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span>{item.title}</span>
                  <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setLocation("/");
                setShowQuickMenu(false);
              }}
              className="w-full p-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              Change Crop
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Primary CTA - Disease Detection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-2xl" />
          <FileUpload onFileSelect={handleFileSelect} isLoading={isAnalyzing} />

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm flex items-center gap-3 text-emerald-300"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-semibold text-sm">Analyzing crop health...</span>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions Grid - 2x3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {quickMenuItems.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={item.action}
              className="group relative p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-600 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                backgroundImage: `linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(34,197,94,0.1) 100%)`
              }} />
              <div className="relative z-10 flex flex-col items-center text-center gap-2">
                <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{item.title}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Status Cards Section */}
        <div className="space-y-4">
          {/* Current Crop Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Current Crop</p>
                <p className="text-3xl font-bold text-white capitalize mt-2">{selectedCrop}</p>
              </div>
              <span className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity">🌾</span>
            </div>
          </motion.div>

          {/* Last Analysis Card */}
          {historyLoading ? (
            <div className="h-24 bg-slate-800 rounded-2xl border border-slate-700 animate-pulse" />
          ) : history && history.length > 0 ? (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => {
                const item = history[0];
                const mappedResult = {
                  result: {
                    crop: item.crop,
                    disease: item.disease,
                    confidence: item.confidence,
                    severity: item.severity,
                    causes: item.causes,
                    natural_solution: item.naturalCure as any,
                    chemical_solution: item.chemicalCure as any,
                    preventive_measures: item.prevention,
                  },
                  image: item.imageUrl,
                };
                sessionStorage.setItem("lastAnalysis", JSON.stringify(mappedResult));
                setLocation("/analysis/view");
              }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(59,130,246,0.15)" }}
              className="w-full group relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-700/50 p-6 overflow-hidden text-left transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Last Disease Detected</p>
                    <p className="text-2xl font-bold text-white mt-1">{history[0].disease}</p>
                  </div>
                  <span className="text-4xl">🔬</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    {formatDistanceToNow(new Date(history[0].timestamp), { addSuffix: true })}
                  </span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 text-center"
            >
              <p className="text-5xl mb-4">📸</p>
              <p className="text-lg font-bold text-white">No Analysis Yet</p>
              <p className="text-sm text-slate-400 mt-2">Take a photo to detect crop diseases</p>
            </motion.div>
          )}

          {/* Daily Log Card */}
          {(() => {
            const logs = JSON.parse(localStorage.getItem("dailyLogs") || "[]");
            const today = new Date().toLocaleDateString();
            const todayLog = logs.find(
              (log: any) => new Date(log.date).toLocaleDateString() === today
            );

            return (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setLocation("/logging")}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(139,92,246,0.15)" }}
                className="w-full group relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-700/50 p-6 overflow-hidden text-left transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest">
                      {todayLog ? "✓ Daily Log Updated" : "📝 Daily Observation"}
                    </p>
                    <p className="text-xl font-bold text-white mt-1">
                      {todayLog ? "Ready for next update" : "Add today's notes"}
                    </p>
                  </div>
                  <span className="text-3xl">{todayLog ? "✅" : "📝"}</span>
                </div>
              </motion.button>
            );
          })()}

          {/* Safety Status Card */}
          {(() => {
            const pesticides = JSON.parse(localStorage.getItem("pesticides") || "[]");
            const activePesticides = pesticides.filter((p: any) => {
              const safe = new Date(p.safeDate);
              const today = new Date();
              return safe > today;
            });

            return (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                onClick={() => setLocation("/withdrawal")}
                whileHover={{ y: -5 }}
                className={`w-full group relative rounded-2xl p-6 overflow-hidden text-left transition-all duration-300 border ${
                  activePesticides.length > 0
                    ? "bg-gradient-to-br from-red-900/30 to-slate-900 border-red-700/50"
                    : "bg-gradient-to-br from-green-900/30 to-slate-900 border-green-700/50"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"  style={{
                  backgroundImage: activePesticides.length > 0 
                    ? `linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(185,28,28,0.1) 100%)`
                    : `linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(16,185,129,0.1) 100%)`
                }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-widest ${
                        activePesticides.length > 0 ? "text-red-300" : "text-green-300"
                      }`}>
                        {activePesticides.length > 0
                          ? `⚠️ ${activePesticides.length} Active Withdrawal`
                          : "✓ Safe to Harvest"}
                      </p>
                      <p className={`text-xl font-bold mt-1 ${
                        activePesticides.length > 0 ? "text-red-300" : "text-green-300"
                      }`}>
                        {activePesticides.length > 0 ? "Check before selling" : "All clear to harvest!"}
                      </p>
                    </div>
                    <span className="text-4xl">{activePesticides.length > 0 ? "⏳" : "✅"}</span>
                  </div>
                </div>
              </motion.button>
            );
          })()}

          {/* Weather Summary */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setLocation("/weather")}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(59,130,246,0.15)" }}
            className="w-full group relative rounded-2xl bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-700/50 p-6 overflow-hidden text-left transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Weather & Alerts</p>
                <p className="text-xl font-bold text-white mt-1">Check 3-day forecast</p>
              </div>
              <span className="text-3xl">🌧️</span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
