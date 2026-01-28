import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Cloud, Droplets, Wind, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface Alert {
  id: string;
  risk: "low" | "medium" | "high";
  title: string;
  description: string;
  action: string;
}

interface WeatherData {
  date: string;
  temp: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

export default function WeatherAlerts() {
  const [, setLocation] = useLocation();
  const [weather, setWeather] = useState<WeatherData[]>([
    { date: "Today", temp: 28, humidity: 75, rainfall: 2, windSpeed: 12 },
    { date: "Tomorrow", temp: 26, humidity: 82, rainfall: 5, windSpeed: 15 },
    { date: "Day 3", temp: 25, humidity: 70, rainfall: 0, windSpeed: 8 },
  ]);

  const generateAlerts = (): Alert[] => {
    const alerts: Alert[] = [];
    weather.forEach((day, index) => {
      if (day.humidity > 80 && day.temp >= 20 && day.temp <= 27) {
        alerts.push({
          id: `mildew-${index}`,
          risk: "high",
          title: "Powdery Mildew Risk",
          description: `High humidity (${day.humidity}%) with warm temperatures`,
          action: "Apply sulfur or neem oil spray",
        });
      }
      if (day.rainfall > 3 && day.humidity > 75) {
        alerts.push({
          id: `leaf-${index}`,
          risk: "high",
          title: "Leaf Spot Disease Risk",
          description: `Heavy rain (${day.rainfall}mm) with high humidity`,
          action: "Ensure good drainage",
        });
      }
      if (day.windSpeed > 25) {
        alerts.push({
          id: `wind-${index}`,
          risk: "medium",
          title: "Strong Wind Warning",
          description: `Wind speed ${day.windSpeed} km/h`,
          action: "Check plant support structures",
        });
      }
    });
    return alerts;
  };

  const alerts = generateAlerts();
  const highRiskCount = alerts.filter((a) => a.risk === "high").length;
  const mediumRiskCount = alerts.filter((a) => a.risk === "medium").length;

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
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Weather</p>
            <h1 className="text-lg font-bold text-white">3-Day Forecast</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Risk Summary */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gradient-to-br from-red-900/30 to-slate-900 border border-red-700/50 rounded-xl text-center">
            <p className="text-2xl font-black text-red-400">{highRiskCount}</p>
            <p className="text-xs font-bold text-red-300 mt-1 uppercase">HIGH RISK</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 bg-gradient-to-br from-yellow-900/30 to-slate-900 border border-yellow-700/50 rounded-xl text-center">
            <p className="text-2xl font-black text-yellow-400">{mediumRiskCount}</p>
            <p className="text-xs font-bold text-yellow-300 mt-1 uppercase">MEDIUM RISK</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-700/50 rounded-xl text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-green-300 uppercase">GOOD</p>
          </motion.div>
        </div>

        {/* Weather Forecast */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white">📊 Weather Data</h2>
          {weather.map((day, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">{day.date}</p>
                <p className="text-2xl font-black text-blue-400 mt-1">{day.temp}°C</p>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-slate-400 font-bold">Humidity</p>
                  <p className="font-bold text-white">{day.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400 font-bold">Rain</p>
                  <p className="font-bold text-white">{day.rainfall}mm</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-slate-400 font-bold">Wind</p>
                  <p className="font-bold text-white">{day.windSpeed}km/h</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Active Alerts
          </h2>

          {alerts.length === 0 ? (
            <div className="text-center py-8 bg-green-900/20 border border-green-700/50 rounded-xl">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
              <p className="font-bold text-green-300">All Clear!</p>
              <p className="text-sm text-green-400 mt-1">No disease risks detected</p>
            </div>
          ) : (
            alerts.map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-xl p-4 border ${
                  alert.risk === "high"
                    ? "bg-red-900/20 border-red-700/50"
                    : "bg-yellow-900/20 border-yellow-700/50"
                }`}
              >
                <p className={`font-bold text-lg ${alert.risk === "high" ? "text-red-400" : "text-yellow-400"}`}>
                  {alert.title}
                </p>
                <p className="text-sm text-slate-300 mt-1">{alert.description}</p>
                <p className={`text-xs font-semibold mt-2 p-2 rounded ${alert.risk === "high" ? "bg-red-900/50 text-red-300" : "bg-yellow-900/50 text-yellow-300"}`}>
                  ✅ {alert.action}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
