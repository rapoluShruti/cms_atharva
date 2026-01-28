import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Gift, Phone } from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  benefit: string;
  subsidy: string;
  eligibility: string[];
}

const SCHEMES: Record<string, Scheme[]> = {
  wheat: [
    {
      id: "1",
      name: "National Agriculture Development Scheme",
      benefit: "Up to ₹5,000 per hectare",
      subsidy: "50% of input cost",
      eligibility: ["Small & marginal farmers", "Min 0.5 hectare", "Below ₹5 lakh income"],
    },
    {
      id: "2",
      name: "PM-KISAN Scheme",
      benefit: "₹6,000 per year",
      subsidy: "₹2,000 per installment",
      eligibility: ["All landholding farmers", "Must have Aadhaar", "Age 18+"],
    },
  ],
  rice: [
    {
      id: "1",
      name: "National Agriculture Development Scheme",
      benefit: "Up to ₹5,000 per hectare",
      subsidy: "50% of input cost",
      eligibility: ["Small & marginal farmers", "Min 0.5 hectare", "Below ₹5 lakh income"],
    },
  ],
  corn: [
    {
      id: "1",
      name: "National Agriculture Development Scheme",
      benefit: "Up to ₹5,000 per hectare",
      subsidy: "50% of input cost",
      eligibility: ["Small & marginal farmers", "Min 0.5 hectare", "Below ₹5 lakh income"],
    },
  ],
  potato: [
    {
      id: "1",
      name: "Horticulture Mission",
      benefit: "Input subsidy",
      subsidy: "40-50% of cost",
      eligibility: ["Horticulture farmers", "Min 0.1 hectare", "Below poverty line"],
    },
  ],
};

export default function GovernmentSchemes() {
  const [, setLocation] = useLocation();
  const selectedCrop = localStorage.getItem("selectedCrop") || "wheat";
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const relevantSchemes = SCHEMES[selectedCrop] || SCHEMES.wheat;

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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Subsidies</p>
            <h1 className="text-lg font-bold text-white">Government Schemes</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Crop Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-900/30 to-slate-900 border border-emerald-700/50 rounded-xl p-4 flex items-center gap-4"
        >
          <span className="text-3xl">🌾</span>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">Selected Crop</p>
            <p className="text-xl font-bold text-emerald-300 capitalize">{selectedCrop}</p>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4"
        >
          <p className="text-sm font-semibold text-blue-300">
            ℹ️ Check official websites for latest deadlines and requirements.
          </p>
        </motion.div>

        {/* Schemes List */}
        <div className="space-y-3">
          {relevantSchemes.map((scheme, idx) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)
                }
                className="w-full text-left p-5 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Gift className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <h3 className="font-bold text-white">{scheme.name}</h3>
                    </div>
                    <div className="inline-block bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold">
                      💰 {scheme.benefit}
                    </div>
                  </div>
                  <div className={`text-2xl transition-transform ${expandedScheme === scheme.id ? "rotate-180" : ""}`}>
                    ▼
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedScheme === scheme.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-700 p-5 bg-slate-900/50 space-y-4"
                >
                  <div>
                    <p className="font-bold text-white mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Eligibility
                    </p>
                    <ul className="space-y-1 ml-7">
                      {scheme.eligibility.map((item, i) => (
                        <li key={i} className="text-sm text-slate-300 font-semibold">
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-900/30 border border-emerald-700/50 p-3 rounded-lg">
                    <p className="text-sm font-bold text-emerald-300">
                      Subsidy: {scheme.subsidy}
                    </p>
                  </div>

                  <button className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                    Apply Online
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-purple-900/20 border border-purple-700/50 rounded-xl p-4 text-center"
        >
          <p className="font-bold text-purple-300 mb-3">📋 Need Help?</p>
          <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors">
            Call Agricultural Department
          </button>
        </motion.div>
      </div>
    </div>
  );
}
