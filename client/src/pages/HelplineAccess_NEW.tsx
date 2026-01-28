import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, AlertTriangle, CheckCircle, MapPin } from "lucide-react";

interface Helpline {
  id: string;
  name: string;
  number: string;
  services: string[];
  availability: string;
}

const HELPLINES: Helpline[] = [
  {
    id: "1",
    name: "National Agriculture Helpline",
    number: "+91-1800-180-1551",
    services: ["Crop advice", "Pest management", "Loan information"],
    availability: "9 AM - 7 PM (Mon-Fri)",
  },
  {
    id: "2",
    name: "Kisan Suvidha Helpline",
    number: "+91-1800-270-1414",
    services: ["Weather updates", "Market prices", "Expert advice"],
    availability: "24/7",
  },
  {
    id: "3",
    name: "IFFCO Helpline",
    number: "+91-9988-777-800",
    services: ["Fertilizer advice", "Crop scheduling"],
    availability: "6 AM - 10 PM",
  },
];

export default function HelplineAccess() {
  const [, setLocation] = useLocation();
  const [expandedHelpline, setExpandedHelpline] = useState<string | null>(null);

  const handleCall = (number: string) => {
    const formattedNumber = number.replace(/[^0-9+]/g, "");
    window.location.href = `tel:${formattedNumber}`;
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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Support</p>
            <h1 className="text-lg font-bold text-white">Get Help</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 flex gap-3"
        >
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-red-300">In Emergency?</p>
            <p className="text-sm text-red-200 mt-1">
              Call your nearest KVK immediately for pest attacks or crop damage
            </p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-center"
          >
            <Phone className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">5+</p>
            <p className="text-xs text-slate-400 font-bold mt-1">National Helplines</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 text-center"
          >
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-xl font-black text-white">24/7</p>
            <p className="text-xs text-slate-400 font-bold mt-1">Some Available</p>
          </motion.div>
        </div>

        {/* Helplines */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white">📞 Contact Helplines</h2>

          {HELPLINES.map((helpline, idx) => (
            <motion.div
              key={helpline.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedHelpline(expandedHelpline === helpline.id ? null : helpline.id)
                }
                className="w-full text-left p-5 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2">{helpline.name}</h3>

                    <a
                      href={`tel:${helpline.number.replace(/[^0-9+]/g, "")}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold text-green-400 text-lg hover:underline block mb-2"
                    >
                      {helpline.number}
                    </a>

                    <div className="flex flex-wrap gap-2 text-xs font-bold">
                      <span className="bg-orange-900/50 text-orange-300 px-2 py-1 rounded-full">
                        {helpline.availability}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`text-2xl transition-transform ${
                      expandedHelpline === helpline.id ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedHelpline === helpline.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-700 p-5 bg-slate-900/50 space-y-3"
                >
                  <div>
                    <p className="font-bold text-white text-sm mb-2">📋 Services:</p>
                    <div className="space-y-1 ml-4">
                      {helpline.services.map((service, i) => (
                        <p key={i} className="text-sm text-slate-300 font-semibold">
                          ✓ {service}
                        </p>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCall(helpline.number);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* KVK Finder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-900/20 border border-green-700/50 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-6 h-6 text-green-400" />
            <div>
              <p className="font-bold text-green-300">Find Local KVK</p>
              <p className="text-xs text-green-400">Krishi Vigyan Kendra - Free training</p>
            </div>
          </div>
          <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
            Search by Location
          </button>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4"
        >
          <p className="font-bold text-yellow-300 mb-2">💡 Quick Tips</p>
          <ul className="space-y-1 text-sm text-yellow-200">
            <li>✓ Save these numbers in your phone</li>
            <li>✓ Many services support regional languages</li>
            <li>✓ Keep farm details ready before calling</li>
            <li>✓ Call during office hours for better response</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
