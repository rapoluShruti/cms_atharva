import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Cloud,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
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

/* ---------------- COMPONENT ---------------- */
export default function WeatherAlerts() {
  const [, setLocation] = useLocation();

  const [weather] = useState<WeatherData[]>([
    { date: "Today", temp: 28, humidity: 75, rainfall: 2, windSpeed: 12 },
    { date: "Tomorrow", temp: 26, humidity: 82, rainfall: 5, windSpeed: 15 },
    { date: "Day 3", temp: 25, humidity: 70, rainfall: 0, windSpeed: 8 },
  ]);

  /* ---------------- ALERT ENGINE ---------------- */
  const generateAlerts = (): Alert[] => {
    const alerts: Alert[] = [];

    weather.forEach((day, index) => {
      if (day.humidity > 80 && day.temp >= 20 && day.temp <= 27) {
        alerts.push({
          id: `mildew-${index}`,
          risk: "high",
          title: "Powdery Mildew Risk",
          description: `High humidity (${day.humidity}%) with warm temperature`,
          action: "Apply sulfur or neem oil spray",
        });
      }

      if (day.rainfall > 3 && day.humidity > 75) {
        alerts.push({
          id: `leaf-${index}`,
          risk: "high",
          title: "Leaf Spot Disease Risk",
          description: `Heavy rainfall (${day.rainfall}mm) detected`,
          action: "Improve drainage & avoid water logging",
        });
      }

      if (day.windSpeed > 25) {
        alerts.push({
          id: `wind-${index}`,
          risk: "medium",
          title: "Strong Wind Warning",
          description: `Wind speed ${day.windSpeed} km/h`,
          action: "Secure crops & support structures",
        });
      }
    });

    return alerts;
  };

  const alerts = generateAlerts();
  const highRiskCount = alerts.filter(a => a.risk === "high").length;
  const mediumRiskCount = alerts.filter(a => a.risk === "medium").length;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation("/home")}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </motion.button>

          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Weather Intelligence
            </p>
            <h1 className="text-lg font-bold text-slate-800">
              3-Day Forecast & Alerts
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-4 text-center">
            <p className="text-3xl font-extrabold text-red-600">
              {highRiskCount}
            </p>
            <p className="text-xs font-semibold text-red-500 mt-1">
              HIGH RISK
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 text-center">
            <p className="text-3xl font-extrabold text-yellow-600">
              {mediumRiskCount}
            </p>
            <p className="text-xs font-semibold text-yellow-500 mt-1">
              MEDIUM RISK
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-1" />
            <p className="text-xs font-semibold text-green-600">
              SAFE CONDITIONS
            </p>
          </div>
        </div>

        {/* WEATHER TABLE */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-3">
            Weather Forecast
          </h2>

          <div className="space-y-3">
            {weather.map((day, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase">
                    {day.date}
                  </p>
                  <p className="text-2xl font-bold text-slate-800">
                    {day.temp}°C
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-500">Humidity</p>
                    <p className="font-semibold">{day.humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">Rainfall</p>
                    <p className="font-semibold">{day.rainfall} mm</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-cyan-600" />
                  <div>
                    <p className="text-xs text-slate-500">Wind</p>
                    <p className="font-semibold">{day.windSpeed} km/h</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ALERTS */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Active Alerts
          </h2>

          {alerts.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <p className="font-bold text-green-700">All Clear</p>
              <p className="text-sm text-green-600">
                No disease risks detected
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`border rounded-xl p-4 ${
                    alert.risk === "high"
                      ? "border-red-200 bg-red-50"
                      : "border-yellow-200 bg-yellow-50"
                  }`}
                >
                  <p
                    className={`font-bold ${
                      alert.risk === "high"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {alert.title}
                  </p>

                  <p className="text-sm text-slate-700 mt-1">
                    {alert.description}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    ✅ {alert.action}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
