import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowLeft, Clock, TrendingDown } from "lucide-react";

interface PesticideEntry {
  id: string;
  pesticide: string;
  withdrawalDays: number;
  appliedDate: string;
  safeDate: string;
}

export default function WithdrawalTracker() {
  const [, setLocation] = useLocation();
  const [pesticides, setPesticides] = useState<PesticideEntry[]>(
    JSON.parse(localStorage.getItem("pesticides") || "[]")
  );
  const [showForm, setShowForm] = useState(false);
  const [selectedPesticide, setSelectedPesticide] = useState("");
  const [withdrawalDays, setWithdrawalDays] = useState(7);

  const COMMON_PESTICIDES: Record<string, number> = {
    "Mancozeb": 5, "Copper Oxychloride": 7, "Carbofuran": 21, "Malathion": 14,
    "Neem Oil": 3, "Sulfur": 7, "Thiram": 10, "Zinc": 5,
  };

  const handleAddPesticide = () => {
    if (!selectedPesticide) {
      alert("Please select a pesticide");
      return;
    }

    const today = new Date();
    const safeDate = new Date(today);
    safeDate.setDate(safeDate.getDate() + withdrawalDays);

    const newEntry: PesticideEntry = {
      id: Date.now().toString(),
      pesticide: selectedPesticide,
      withdrawalDays,
      appliedDate: today.toLocaleDateString(),
      safeDate: safeDate.toLocaleDateString(),
    };

    const updated = [newEntry, ...pesticides];
    setPesticides(updated);
    localStorage.setItem("pesticides", JSON.stringify(updated));

    setSelectedPesticide("");
    setWithdrawalDays(7);
    setShowForm(false);
  };

  const calculateDaysRemaining = (safeDate: string) => {
    const safe = new Date(safeDate);
    const today = new Date();
    const diff = Math.ceil((safe.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Safety</p>
            <h1 className="text-lg font-bold text-white">Pesticide Withdrawal</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 flex gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-red-300">⚠️ IMPORTANT</p>
            <p className="text-sm text-red-200">DO NOT harvest until countdown reaches zero!</p>
          </div>
        </motion.div>

        {/* Add Button */}
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Clock className="w-5 h-5 inline mr-2" />
            Log Pesticide Applied
          </motion.button>
        )}

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold text-white">New Pesticide Log</h2>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Select Pesticide</label>
              <select
                value={selectedPesticide}
                onChange={(e) => {
                  setSelectedPesticide(e.target.value);
                  setWithdrawalDays(COMMON_PESTICIDES[e.target.value] || 7);
                }}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-orange-500 outline-none transition-colors"
              >
                <option value="">-- Select --</option>
                {Object.entries(COMMON_PESTICIDES).map(([name, days]) => (
                  <option key={name} value={name}>{name} ({days} days)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-3">
                Withdrawal Period: <span className="text-orange-400">{withdrawalDays} days</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={withdrawalDays}
                onChange={(e) => setWithdrawalDays(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-orange-900/30 border border-orange-700/50 p-3 rounded-lg">
              <p className="text-sm font-bold text-orange-300">
                ⏰ Safe to harvest: {new Date(Date.now() + withdrawalDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPesticide}
                className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Log Application
              </button>
            </div>
          </motion.div>
        )}

        {/* Active Withdrawals */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Active Withdrawals
          </h2>

          {pesticides.length === 0 ? (
            <div className="text-center py-8 bg-slate-800/50 border border-slate-700 rounded-xl">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
              <p className="font-bold text-white">All clear!</p>
              <p className="text-sm text-slate-400 mt-1">No active withdrawal periods</p>
            </div>
          ) : (
            pesticides.map((entry, idx) => {
              const daysLeft = calculateDaysRemaining(entry.safeDate);
              const isReadyToHarvest = daysLeft <= 0;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`rounded-xl p-4 border-l-4 ${
                    isReadyToHarvest
                      ? "bg-green-900/20 border-l-green-500"
                      : "bg-red-900/20 border-l-red-500"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-white">{entry.pesticide}</p>
                      <p className="text-xs text-slate-400 mt-1">Applied: {entry.appliedDate}</p>
                    </div>
                    <div className="text-right">
                      {isReadyToHarvest ? (
                        <div>
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
                          <p className="font-bold text-green-400 text-sm">SAFE NOW</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-3xl font-black text-red-400">{daysLeft}</p>
                          <p className="text-xs text-red-400 font-bold">days left</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`mt-3 w-full h-2 rounded-full overflow-hidden ${isReadyToHarvest ? "bg-green-900/50" : "bg-red-900/50"}`}>
                    <div
                      className={`h-full transition-all ${isReadyToHarvest ? "bg-green-500 w-full" : "bg-red-500"}`}
                      style={{
                        width: `${Math.max(0, (daysLeft / entry.withdrawalDays) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
