import { useState } from "react";

type Weather = {
  temp: number;
  humidity: number;
  rain: boolean;
};

export default function Dashboard(): JSX.Element {
  const [plantStatus, setPlantStatus] = useState<string>("Not Checked");
  const [alerts, setAlerts] = useState<string[]>([
    "Yesterday · High humidity warning",
    "Aug 10 · Spray reminder completed ✔",
    "Aug 8 · Disease check – Healthy 🌱",
  ]);

  const weather: Weather = {
    temp: 32,
    humidity: 78,
    rain: true,
  };

  const isHighRisk: boolean = weather.humidity > 70 && weather.rain;

  const checkPlantHealth = (): void => {
    setPlantStatus("Healthy 🌱");
    setAlerts((prev) => [
      "Today · Plant health checked – Healthy 🌱",
      ...prev,
    ]);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🌿 FarmGuard</h2>
        <nav>
          <a className="active">🏠 Home</a>
          <a>📄 Logs</a>
          <a>🌦 Weather</a>
          <a>👤 Profile</a>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <input placeholder="Search..." />
          <div className="top-actions">
            <span>Weather</span>
            <span>Logs</span>
            <span>EN</span>
            <button className="logout">Logout</button>
          </div>
        </header>

        <section className="content">
          {/* Weather */}
          <div className="weather-card">
            <div>
              <h3>☀ Today’s Farm Weather</h3>
              <h1>{weather.temp}°C</h1>
              <p>
                Humidity: <strong>{weather.humidity}%</strong>
              </p>
              <p className="muted">
                {weather.rain ? "Rain expected" : "Clear weather"}
              </p>
            </div>
            <div className="illustration" />
          </div>

          {/* Risk */}
          {isHighRisk && (
            <div className="alert-card">
              ⚠ <strong>HIGH RISK:</strong> Fungal disease possible due to rain
            </div>
          )}

          {/* Action */}
          <div className="action-card">
            👨‍🌾 Best action today:{" "}
            <strong>Spray neem oil before evening</strong>
          </div>

          {/* CTA */}
          <button className="primary-btn" onClick={checkPlantHealth}>
            📷 Check Plant Health
          </button>

          <p className="status">
            Plant Status: <strong>{plantStatus}</strong>
          </p>

          {/* Bottom */}
          <div className="grid">
            <div className="feature">🛡 Prevention</div>
            <div className="feature">🌧 Weather Alerts</div>
            <div className="feature">🎧 Expert Help</div>

            <div className="alerts">
              <h4>Recent Alerts</h4>
              <ul>
                {alerts.map((alert, index) => (
                  <li key={index}>{alert}</li>
                ))}
              </ul>
              <button className="secondary-btn">Expert Help</button>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        * { box-sizing: border-box; font-family: Inter, sans-serif; }
        body { margin: 0; background: #f4f7f5; }

        .app { display: flex; height: 100vh; }

        .sidebar {
          width: 230px;
          background: linear-gradient(180deg,#1f5f3b,#164b30);
          color: white;
          padding: 20px;
        }

        .sidebar nav a {
          display: block;
          padding: 12px;
          margin-top: 10px;
          border-radius: 8px;
          cursor: pointer;
        }

        .sidebar nav a.active,
        .sidebar nav a:hover {
          background: rgba(255,255,255,0.15);
        }

        .main { flex: 1; display: flex; flex-direction: column; }

        .topbar {
          background: #1f5f3b;
          padding: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .topbar input {
          padding: 8px 14px;
          border-radius: 20px;
          border: none;
          width: 260px;
        }

        .logout {
          background: #e11d48;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .content {
          padding: 30px;
          overflow-y: auto;
        }

        .weather-card {
          background: white;
          border-radius: 18px;
          padding: 25px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .weather-card h1 { font-size: 46px; }

        .illustration {
          width: 220px;
          height: 130px;
          background: #e8f3ec;
          border-radius: 15px;
        }

        .alert-card {
          background: #fff7ed;
          border-left: 6px solid #f97316;
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .action-card {
          background: #ecfdf5;
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .primary-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg,#1f5f3b,#15803d);
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 18px;
          cursor: pointer;
        }

        .status { margin: 12px 0 30px; }

        .grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 20px;
        }

        .feature {
          background: white;
          padding: 25px;
          border-radius: 16px;
          text-align: center;
          font-size: 18px;
        }

        .alerts {
          background: white;
          padding: 20px;
          border-radius: 16px;
        }

        .alerts ul { padding-left: 18px; }

        .alerts li { margin-bottom: 10px; font-size: 14px; }

        .secondary-btn {
          background: #1f5f3b;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 20px;
        }

        .muted { color: #6b7280; }
      `}</style>
    </div>
  );
}
