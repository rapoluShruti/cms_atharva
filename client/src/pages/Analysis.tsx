import { useLocation } from "wouter";
import { AnalysisResultCard } from "@/components/analysis/AnalysisResultCard";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { AnalysisResponse } from "@shared/schema";
import { motion } from "framer-motion";

export default function Analysis() {
  const [location, setLocation] = useLocation();
  const [data, setData] = useState<{ result: AnalysisResponse; image: string } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("lastAnalysis");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => setLocation("/")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold">Analysis Report</h1>
      </div>

      <div className="px-6 py-6">
        <AnalysisResultCard result={data.result} imageUrl={data.image} />
      </div>

      {/* Floating Actions */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-6 right-6 flex gap-3 z-50 max-w-md mx-auto"
      >
        <button 
          onClick={() => setLocation("/chat")}
          className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5" />
          Ask Expert
        </button>
        <button className="flex-none bg-white text-emerald-700 p-4 rounded-2xl font-bold shadow-lg shadow-black/5 border border-emerald-100 hover:bg-emerald-50 transition-all active:scale-[0.98]">
          <Phone className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
}
