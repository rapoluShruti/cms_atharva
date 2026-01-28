import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Camera, ArrowLeft, CheckCircle, Calendar, Image as ImageIcon, PlusCircle } from "lucide-react";

interface CropLog {
  id: string;
  date: string;
  image: string;
  notes: string;
}

export default function DailyLogging() {
  const [, setLocation] = useLocation();
  const [logs, setLogs] = useState<CropLog[]>(
    JSON.parse(localStorage.getItem("dailyLogs") || "[]")
  );
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  const selectedCrop = localStorage.getItem("selectedCrop") || "wheat";

  const handleImageCapture = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLog = () => {
    if (!currentImage) {
      alert("Please capture an image first");
      return;
    }

    const newLog: CropLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      image: currentImage,
      notes,
    };

    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem("dailyLogs", JSON.stringify(updated));

    setCurrentImage(null);
    setNotes("");
    setShowForm(false);
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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Daily Log</p>
            <h1 className="text-lg font-bold text-white">{selectedCrop.toUpperCase()}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Add Log Button */}
        {!showForm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/50 hover:shadow-xl transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Add Today's Log
          </motion.button>
        )}

        {/* Logging Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold text-white">Today's Observation</h2>

            {/* Image Capture */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Capture Image
              </label>
              <label className="block p-6 border-2 border-dashed border-slate-600 hover:border-emerald-500 rounded-xl cursor-pointer transition-colors bg-slate-700/30 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Camera className="w-8 h-8 text-emerald-400" />
                  <span className="text-sm font-semibold text-slate-300">
                    {currentImage ? "✓ Image captured" : "Tap to capture photo"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageCapture}
                  className="hidden"
                />
              </label>
              {currentImage && (
                <img
                  src={currentImage}
                  alt="Preview"
                  className="mt-3 w-full h-48 object-cover rounded-xl border border-slate-600"
                />
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any observations? Pest activity, leaf color, wilting..."
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setShowForm(false);
                  setCurrentImage(null);
                  setNotes("");
                }}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLog}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Save Log
              </button>
            </div>
          </motion.div>
        )}

        {/* Logs Timeline */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            Log History
          </h2>

          {logs.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-2xl">
              <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-semibold">No logs yet</p>
              <p className="text-sm text-slate-500 mt-1">Start logging your daily observations</p>
            </div>
          ) : (
            logs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors"
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-emerald-400">{log.date}</p>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>

                  {log.image && (
                    <img
                      src={log.image}
                      alt="Log"
                      className="w-full h-32 object-cover rounded-lg border border-slate-600"
                    />
                  )}

                  {log.notes && (
                    <p className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-lg">{log.notes}</p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
