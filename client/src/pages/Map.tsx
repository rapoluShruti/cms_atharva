import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { ArrowLeft, AlertTriangle, Leaf } from "lucide-react";
import "leaflet/dist/leaflet.css";

/* ---------------- Leaflet Icons ---------------- */

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  shadowSize: [41, 41],
});

const greenIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  shadowSize: [41, 41],
});

L.Marker.prototype.setIcon(defaultIcon);

/* ---------------- Component ---------------- */

export default function FarmerMap() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (!data) {
      setLocation("/profile");
      return;
    }

    const parsed = JSON.parse(data);
    setUserData(parsed);

    /* -------- Mock Anonymous Nearby Issues -------- */

    const mockIssues = [
      {
        id: 1,
        crop: "wheat",
        issue: "Rust infection detected",
        reason: "High humidity and recent rainfall",
        severity: "Medium",
        lat: parsed.gps.lat + 0.005,
        lng: parsed.gps.lng + 0.004,
        distance: 0.8,
      },
      {
        id: 2,
        crop: "wheat",
        issue: "Powdery mildew risk",
        reason: "Cool nights and dense crop growth",
        severity: "Low",
        lat: parsed.gps.lat - 0.003,
        lng: parsed.gps.lng + 0.006,
        distance: 1.2,
      },
      {
        id: 3,
        crop: "rice",
        issue: "Blast disease warning",
        reason: "Standing water and cloudy weather",
        severity: "High",
        lat: parsed.gps.lat - 0.006,
        lng: parsed.gps.lng - 0.007,
        distance: 2.1,
      },
      {
        id: 4,
        crop: "maize",
        issue: "Pest activity observed",
        reason: "Increase in temperature and dry spells",
        severity: "Medium",
        lat: parsed.gps.lat + 0.007,
        lng: parsed.gps.lng - 0.004,
        distance: 1.6,
      },
    ];

    setIssues(mockIssues);
  }, [setLocation]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  /* -------- Derived Data -------- */

  const nearbyCrops = Array.from(new Set(issues.map((i) => i.crop)));

  /* ---------------- UI ---------------- */

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4 flex items-center gap-4 shadow-lg">
        <button
          onClick={() => setLocation("/")}
          className="p-2 hover:bg-emerald-700 rounded-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black">Nearby Farming Intelligence</h1>
          <p className="text-emerald-100 text-sm">
            Anonymous crop issues within your area
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden shadow-xl">
          <MapContainer
            center={[userData.gps.lat, userData.gps.lng]}
            zoom={13}
            style={{ height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* User Marker */}
            <Marker
              position={[userData.gps.lat, userData.gps.lng]}
              icon={greenIcon}
            >
              <Popup>
                <div className="font-bold">Your Farm</div>
                <div className="text-sm">
                  Crop: {userData.crop.toUpperCase()}
                </div>
              </Popup>
            </Marker>

            {/* Issue Markers */}
            {issues.map((item) => (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={defaultIcon}
              >
                <Popup>
                  <div className="p-2">
                    <div className="font-bold text-emerald-900">
                      {item.crop.toUpperCase()} – Nearby Issue
                    </div>

                    <div className="text-sm text-orange-700 mt-1 font-semibold">
                      ⚠ {item.issue}
                    </div>

                    <div className="text-xs text-gray-600 mt-1">
                      Reason: {item.reason}
                    </div>

                    <div
                      className={`text-xs font-bold mt-2 ${
                        item.severity === "High"
                          ? "text-red-600"
                          : item.severity === "Medium"
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      Severity: {item.severity}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      ~{item.distance} km radius
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-50 rounded-2xl p-4 overflow-y-auto shadow-lg">
          {/* Crops Nearby */}
          <div className="mb-5">
            <h2 className="font-black text-emerald-950 mb-2">
              🌱 Crops Grown Nearby
            </h2>
            <div className="flex flex-wrap gap-2">
              {nearbyCrops.map((crop) => (
                <span
                  key={crop}
                  className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold"
                >
                  {crop.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Issues List */}
          <h2 className="font-black text-emerald-950 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Nearby Issues
          </h2>

          <div className="space-y-3">
            {issues.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border-2 border-emerald-100"
              >
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-emerald-900">
                    {item.crop.toUpperCase()}
                  </h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {item.distance} km
                  </span>
                </div>

                <p className="text-sm font-semibold text-orange-700">
                  {item.issue}
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  Reason: {item.reason}
                </p>

                <p
                  className={`text-xs font-bold mt-2 ${
                    item.severity === "High"
                      ? "text-red-600"
                      : item.severity === "Medium"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  Severity Level: {item.severity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
