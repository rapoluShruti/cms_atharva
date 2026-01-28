import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { ArrowLeft, Users, Leaf } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  shadowSize: [41, 41],
});

const greenIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  shadowSize: [41, 41],
});

L.Marker.prototype.setIcon(defaultIcon);

export default function FarmerMap() {
  const [, setLocation] = useLocation();
  const [userData, setUserData] = useState<any>(null);
  const [farmers, setFarmers] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (!data) {
      setLocation("/profile");
      return;
    }

    const parsed = JSON.parse(data);
    setUserData(parsed);

    // Generate mock nearby farmers with similar crops
    const mockFarmers = [
      {
        id: 1,
        name: "Raj Kumar",
        crop: "wheat",
        lat: parsed.gps.lat + 0.005,
        lng: parsed.gps.lng + 0.005,
        disease: "Powdery Mildew",
        distance: 0.8,
      },
      {
        id: 2,
        name: "Priya Singh",
        crop: "wheat",
        lat: parsed.gps.lat - 0.003,
        lng: parsed.gps.lng + 0.008,
        disease: "Rust",
        distance: 1.2,
      },
      {
        id: 3,
        name: "Harjeet Patel",
        crop: "wheat",
        lat: parsed.gps.lat + 0.007,
        lng: parsed.gps.lng - 0.004,
        disease: "Healthy",
        distance: 1.5,
      },
      {
        id: 4,
        name: "Arun Verma",
        crop: "rice",
        lat: parsed.gps.lat - 0.006,
        lng: parsed.gps.lng - 0.007,
        disease: "Blast",
        distance: 2.1,
      },
      {
        id: 5,
        name: "Meera Kumari",
        crop: "wheat",
        lat: parsed.gps.lat + 0.004,
        lng: parsed.gps.lng + 0.006,
        disease: "Healthy",
        distance: 0.6,
      },
    ];

    setFarmers(mockFarmers);
  }, [setLocation]);

  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const similarFarmers = farmers.filter((f) => f.crop === userData.crop);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4 flex items-center gap-4 shadow-lg">
        <button
          onClick={() => setLocation("/")}
          className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black">Nearby Farmers Network</h1>
          <p className="text-emerald-100 text-sm">
            {similarFarmers.length} farmers growing {userData.crop}
          </p>
        </div>
      </div>

      {/* Map Container */}
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
              attribution='&copy; OpenStreetMap contributors'
            />

            {/* Your Location */}
            <Marker
              position={[userData.gps.lat, userData.gps.lng]}
              icon={greenIcon}
            >
              <Popup>
                <div className="font-bold">Your Location</div>
                <div className="text-sm">{userData.crop} - {userData.name}</div>
              </Popup>
            </Marker>

            {/* Other Farmers */}
            {farmers.map((farmer) => (
              <Marker key={farmer.id} position={[farmer.lat, farmer.lng]} icon={defaultIcon}>
                <Popup>
                  <div className="p-2">
                    <div className="font-bold text-emerald-900">{farmer.name}</div>
                    <div className="text-sm text-gray-600">
                      <Leaf className="w-4 h-4 inline mr-1 text-emerald-600" />
                      {farmer.crop}
                    </div>
                    <div className="text-sm text-gray-600">
                      Status: <span className={farmer.disease === 'Healthy' ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>
                        {farmer.disease}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ~{farmer.distance} km away
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar - Farmer List */}
        <div className="w-80 bg-gray-50 rounded-2xl p-4 overflow-y-auto shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-emerald-600" />
            <h2 className="font-black text-emerald-950">Similar Farmers</h2>
          </div>

          <div className="space-y-3">
            {similarFarmers.map((farmer) => (
              <div
                key={farmer.id}
                className="bg-white p-4 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-emerald-950">{farmer.name}</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    {farmer.distance} km
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    {farmer.crop.charAt(0).toUpperCase() + farmer.crop.slice(1)}
                  </div>

                  <div>
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        farmer.disease === "Healthy"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {farmer.disease}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition-all group-hover:scale-[1.02]">
                  Connect
                </button>
              </div>
            ))}
          </div>

          {similarFarmers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No other farmers growing {userData.crop} nearby</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
