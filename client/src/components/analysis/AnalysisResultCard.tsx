import { AnalysisResponse } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, Droplets, FlaskConical, ShieldAlert, Leaf } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  result: AnalysisResponse;
  imageUrl?: string;
}

export function AnalysisResultCard({ result, imageUrl }: Props) {
  const [activeTab, setActiveTab] = useState<'natural' | 'chemical'>('natural');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8"
    >
      {/* Left Column: Image & Metrics */}
      <div className="space-y-6">
        <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl group border-4 border-white">
          {imageUrl ? (
            <img src={imageUrl} alt={result.crop} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
              <Leaf className="w-12 h-12 text-emerald-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-4 py-1.5 bg-emerald-500/90 backdrop-blur-md rounded-full text-sm font-bold text-white mb-3 border border-emerald-400/50">
                  {result.crop}
                </span>
                <h2 className="text-4xl font-black text-white leading-tight drop-shadow-md">{result.disease}</h2>
              </div>
              <div className={cn(
                "px-4 py-2 rounded-xl text-lg font-black backdrop-blur-md border shadow-lg",
                result.severity > 70 
                  ? "bg-red-500/90 text-white border-red-400/50" 
                  : "bg-yellow-500/90 text-white border-yellow-400/50"
              )}>
                {result.severity}% Severity
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-md border border-emerald-50 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 text-emerald-700 mb-3">
              <ShieldAlert className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Confidence</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-emerald-900">{result.confidence}%</span>
            </div>
            <div className="h-2.5 w-full bg-emerald-50 rounded-full mt-4 overflow-hidden border border-emerald-100">
              <div 
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                style={{ width: `${result.confidence}%` }} 
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md border border-emerald-50 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 text-red-700 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-widest">Severity</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-4xl font-black",
                result.severity > 70 ? "text-red-600" : "text-yellow-600"
              )}>{result.severity}%</span>
            </div>
            <div className="h-2.5 w-full bg-gray-50 rounded-full mt-4 overflow-hidden border border-gray-100">
              <div 
                className={cn(
                  "h-full rounded-full shadow-lg",
                  result.severity > 70 ? "bg-red-500" : "bg-yellow-500"
                )}
                style={{ width: `${result.severity}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-md border border-emerald-50">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-emerald-950">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            Possible Causes
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(result.causes || []).map((cause, idx) => (
              <li key={idx} className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl text-amber-900 font-medium text-sm border border-amber-100/50">
                <div className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
                {cause}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column: Treatment & Prevention */}
      <div className="space-y-8">
        <div className="bg-white p-2 rounded-2xl shadow-inner border border-gray-100 flex gap-2">
          <button
            onClick={() => setActiveTab('natural')}
            className={cn(
              "flex-1 py-4 text-base font-black rounded-xl flex items-center justify-center gap-3 transition-all",
              activeTab === 'natural' 
                ? "bg-emerald-600 text-white shadow-xl scale-[1.02]" 
                : "text-emerald-900 hover:bg-emerald-50"
            )}
          >
            <Leaf className="w-5 h-5" />
            Natural Remedy
          </button>
          <button
            onClick={() => setActiveTab('chemical')}
            className={cn(
              "flex-1 py-4 text-base font-black rounded-xl flex items-center justify-center gap-3 transition-all",
              activeTab === 'chemical' 
                ? "bg-orange-600 text-white shadow-xl scale-[1.02]" 
                : "text-orange-900 hover:bg-orange-50"
            )}
          >
            <FlaskConical className="w-5 h-5" />
            Chemical Cure
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "p-8 rounded-[2rem] border-4 shadow-2xl relative overflow-hidden",
              activeTab === 'natural' 
                ? "bg-emerald-50/50 border-emerald-100" 
                : "bg-orange-50/50 border-orange-100"
            )}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              {activeTab === 'natural' ? <Leaf className="w-32 h-32" /> : <FlaskConical className="w-32 h-32" />}
            </div>

            <div className="relative z-10">
              <h4 className={cn(
                "font-black text-2xl mb-4",
                activeTab === 'natural' ? "text-emerald-800" : "text-orange-800"
              )}>
                {activeTab === 'natural' ? "Organic Protocol" : "Scientific Treatment"}
              </h4>
              <p className="text-lg text-emerald-900/70 font-medium mb-8 leading-relaxed max-w-lg">
                {activeTab === 'natural' 
                  ? (result.natural_solution?.description || "Loading natural solution...") 
                  : (result.chemical_solution?.description || "Loading chemical solution...")}
              </p>
              
              <div className="space-y-4">
                <h5 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-4">Treatment Steps</h5>
                {((activeTab === 'natural' ? result.natural_solution?.steps : result.chemical_solution?.steps) || []).map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white shadow-sm hover:shadow-md transition-all group">
                    <span className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black transition-transform group-hover:scale-110",
                      activeTab === 'natural' 
                        ? "bg-emerald-600 text-white" 
                        : "bg-orange-600 text-white"
                    )}>
                      {idx + 1}
                    </span>
                    <span className="text-gray-800 font-bold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="bg-emerald-950 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldAlert className="w-32 h-32 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-emerald-400 relative z-10">
            <CheckCircle className="w-7 h-7" />
            Long-term Prevention
          </h3>
          <div className="grid grid-cols-1 gap-3 relative z-10">
            {(result.preventive_measures || []).map((measure, idx) => (
              <div key={idx} className="flex gap-4 items-center p-4 bg-emerald-900/50 rounded-2xl border border-emerald-800 group hover:bg-emerald-900 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-all">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-emerald-50 font-bold">{measure}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
