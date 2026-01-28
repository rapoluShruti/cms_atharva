import { useState } from "react";

export default function Demo() {
  const [plantStatus, setPlantStatus] = useState("Not Checked");
  const [alerts, setAlerts] = useState([
    "Yesterday · High humidity warning",
    "Aug 10 · Spray reminder completed ✔",
    "Aug 8 · Disease check – Healthy 🌱",
  ]);

  const weather = {
    temp: 32,
    humidity: 78,
    rain: true,
  };

  const isHighRisk = weather.humidity > 70 && weather.rain;

  const checkPlantHealth = () => {
    setPlantStatus("Healthy 🌱");
    setAlerts((prev) => [
      "Today · Plant health checked – Healthy 🌱",
      ...prev,
    ]);
  };

  return (
    <div>
      <h1>Demo Page</h1>
      <p>This is a demo component.</p>
    </div>

  );
}