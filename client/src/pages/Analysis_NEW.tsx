import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Download, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

// This is a result card component to display analysis results
export function AnalysisResultCard({
  crop,
  disease,
  severity,
  confidence,
  treatment,
  onClose,
}: {
  crop: string;
  disease: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  treatment: string;
  onClose?: () => void;
}) {
  const severityConfig = {
    low: {
      bg: "bg-green-900/30",
      border: "border-green-700/50",
      text: "text-green-400",
      badge: "bg-green-900/50 text-green-300",
      icon: CheckCircle,
    },
    medium: {
      bg: "bg-yellow-900/30",
      border: "border-yellow-700/50",
      text: "text-yellow-400",
      badge: "bg-yellow-900/50 text-yellow-300",
      icon: AlertCircle,
    },
    high: {
      bg: "bg-red-900/30",
      border: "border-red-700/50",
      text: "text-red-400",
      badge: "bg-red-900/50 text-red-300",
      icon: AlertTriangle,
    },
  };

  const config = severityConfig[severity];
  const SeverityIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${config.bg} border ${config.border} rounded-2xl p-6 space-y-6`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <SeverityIcon className={`w-6 h-6 ${config.text}`} />
            <p className={`font-black text-lg uppercase tracking-wide ${config.text}`}>
              {severity === "high"
                ? "Immediate Action"
                : severity === "medium"
                  ? "Monitor Closely"
                  : "Low Risk"}
            </p>
          </div>
          <p className="text-2xl font-black text-white">{disease}</p>
          <p className="text-sm text-slate-400 mt-1">Detected on {crop}</p>
        </div>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </motion.button>
        )}
      </div>

      {/* Confidence */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-slate-300">Detection Confidence</p>
          <p className={`text-lg font-black ${config.text}`}>{(confidence * 100).toFixed(0)}%</p>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full ${
              severity === "high"
                ? "bg-gradient-to-r from-red-500 to-red-400"
                : severity === "medium"
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                  : "bg-gradient-to-r from-green-500 to-emerald-400"
            }`}
          />
        </div>
      </div>

      {/* Treatment */}
      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
          🔧 Recommended Treatment
        </p>
        <p className="text-slate-200 leading-relaxed">{treatment}</p>
      </div>

      {/* Severity Details */}
      <div className={`${config.badge} rounded-lg px-4 py-3 text-center`}>
        <p className="font-bold text-sm">
          {severity === "high"
            ? "⚠️ Act within 48-72 hours for best results"
            : severity === "medium"
              ? "📌 Monitor daily and watch for progression"
              : "✅ Monitor but no immediate action needed"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`py-3 rounded-lg font-bold text-white transition-all ${
            severity === "high"
              ? "bg-red-600 hover:bg-red-700"
              : severity === "medium"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          Learn More
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Save
        </motion.button>
      </div>
    </motion.div>
  );
}

// Full Analysis page
export default function Analysis() {
  const [, setLocation] = useLocation();

  // Sample analysis result - in real app this would come from props/state
  const analysisResult = {
    crop: "Tomato",
    disease: "Early Blight (Alternaria)",
    severity: "high" as const,
    confidence: 0.92,
    treatment:
      "Apply fungicide containing chlorothalonil or copper compounds. Remove infected leaves and improve ventilation. Spray every 7-10 days until disease subsides.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-12">
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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Analysis</p>
            <h1 className="text-lg font-bold text-white">Disease Detection</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Analysis Result */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <AnalysisResultCard {...analysisResult} />
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-lg font-bold text-white">📚 More Information</h2>

          {/* Disease Details */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3">
            <p className="font-bold text-white text-sm uppercase tracking-wider">About Early Blight</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Early blight is a fungal disease caused by Alternaria solani. It primarily affects
              tomato and potato plants, appearing as brown spots with concentric rings on leaves and
              stems. The disease thrives in warm, humid conditions.
            </p>

            <div className="space-y-2">
              <p className="font-bold text-white text-sm">Conditions Favoring Disease:</p>
              <ul className="text-sm text-slate-300 space-y-1 ml-4">
                <li>✓ Temperature: 20-27°C</li>
                <li>✓ High humidity and wetness</li>
                <li>✓ Poor ventilation</li>
                <li>✓ Overhead irrigation</li>
              </ul>
            </div>
          </div>

          {/* Prevention Tips */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 space-y-3">
            <p className="font-bold text-white text-sm uppercase tracking-wider">🛡️ Prevention Tips</p>
            <ul className="text-sm text-slate-300 space-y-2 ml-4">
              <li>✓ Practice crop rotation (3-year rotation)</li>
              <li>✓ Reduce leaf wetness through proper irrigation</li>
              <li>✓ Ensure good air circulation</li>
              <li>✓ Remove lower plant leaves</li>
              <li>✓ Use disease-free seed/seedlings</li>
              <li>✓ Scout fields regularly for early signs</li>
            </ul>
          </div>

          {/* Expert Tips */}
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-5">
            <p className="font-bold text-blue-300 text-sm uppercase tracking-wider mb-2">
              💡 Expert Recommendation
            </p>
            <p className="text-blue-200 text-sm">
              Given the 92% confidence in this detection, we recommend applying a fungicide
              immediately. Monitor the field daily and repeat application every 7-10 days.
              Contact your local agricultural extension office for specific product recommendations.
            </p>
          </div>
        </motion.div>

        {/* Helpline CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <button
            onClick={() => setLocation("/helpline")}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            📞 Need Expert Help? Call a Helpline
          </button>
        </motion.div>
      </div>
    </div>
  );
}
