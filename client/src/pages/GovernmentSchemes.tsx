import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Gift, Phone, ChevronDown } from "lucide-react";

/* ---------------- TYPES ---------------- */
interface Scheme {
  id: string;
  name: string;
  benefit: string;
  subsidy: string;
  eligibility: string[];
}

/* ---------------- SCHEME DATA ---------------- */
const SCHEMES: Record<string, Scheme[]> = {
  wheat: [
    {
      id: "pm-kisan",
      name: "PM-KISAN Samman Nidhi",
      benefit: "₹6,000 per year",
      subsidy: "₹2,000 × 3 installments",
      eligibility: [
        "All landholding farmers",
        "Valid Aadhaar linked bank account",
        "Farmer family ownership required",
      ],
    },
    {
      id: "pmfby",
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      benefit: "Crop insurance coverage",
      subsidy: "Premium subsidy up to 90%",
      eligibility: [
        "Farmers growing notified crops",
        "Loanee & non-loanee farmers",
        "Enrollment before sowing season",
      ],
    },
    {
      id: "soil",
      name: "Soil Health Card Scheme",
      benefit: "Free soil testing",
      subsidy: "100% government funded",
      eligibility: [
        "All farmers",
        "Agricultural land ownership",
        "Periodic soil testing",
      ],
    },
  ],

  rice: [
    {
      id: "nadp",
      name: "National Agriculture Development Programme",
      benefit: "₹5,000 per hectare",
      subsidy: "50% of input cost",
      eligibility: [
        "Small & marginal farmers",
        "Minimum 0.5 hectare land",
        "Annual income below ₹5 lakh",
      ],
    },
    {
      id: "pmksy",
      name: "Pradhan Mantri Krishi Sinchai Yojana",
      benefit: "Irrigation support",
      subsidy: "Up to 55% subsidy",
      eligibility: [
        "Farmers in rain-fed areas",
        "Valid land records",
        "Micro-irrigation adoption",
      ],
    },
  ],

  potato: [
    {
      id: "nhm",
      name: "National Horticulture Mission",
      benefit: "Input & infrastructure support",
      subsidy: "40–50% of project cost",
      eligibility: [
        "Horticulture farmers",
        "Minimum 0.1 hectare land",
        "Registered farmer groups preferred",
      ],
    },
  ],

  default: [
    {
      id: "kcc",
      name: "Kisan Credit Card (KCC)",
      benefit: "Easy crop loans",
      subsidy: "Interest subvention up to 4%",
      eligibility: [
        "All farmers",
        "Valid land documents",
        "Linked bank account",
      ],
    },
  ],
};

/* ---------------- COMPONENT ---------------- */
export default function GovernmentSchemes() {
  const [, setLocation] = useLocation();
  const selectedCrop = localStorage.getItem("selectedCrop") || "wheat";
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const schemes =
    SCHEMES[selectedCrop] || SCHEMES.default;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/home")}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Government Support
            </p>
            <h1 className="text-lg font-bold text-slate-800">
              Agricultural Schemes
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* CROP INFO */}
        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <span className="text-3xl">🌾</span>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">
              Selected Crop
            </p>
            <p className="text-xl font-bold text-slate-800 capitalize">
              {selectedCrop}
            </p>
          </div>
        </div>

        {/* INFO */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-blue-700">
            ℹ️ Scheme details may vary by state. Always verify on official portals.
          </p>
        </div>

        {/* SCHEMES */}
        <div className="space-y-4">
          {schemes.map((scheme, idx) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedScheme(
                    expandedScheme === scheme.id ? null : scheme.id
                  )
                }
                className="w-full text-left p-5 hover:bg-slate-50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-bold text-slate-800">
                        {scheme.name}
                      </h3>
                    </div>
                    <p className="text-sm text-emerald-700 font-semibold">
                      💰 {scheme.benefit}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 transition-transform ${
                      expandedScheme === scheme.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {expandedScheme === scheme.id && (
                <div className="border-t p-5 space-y-4 bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Eligibility
                    </p>
                    <ul className="space-y-1 ml-7">
                      {scheme.eligibility.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700">
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-emerald-700">
                      Subsidy: {scheme.subsidy}
                    </p>
                  </div>

                  <button className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700">
                    Apply Online
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* HELP */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <p className="font-bold text-purple-700 mb-3">
            Need Assistance?
          </p>
          <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Call Agriculture Helpline
          </button>
        </div>
      </div>
    </div>
  );
}
