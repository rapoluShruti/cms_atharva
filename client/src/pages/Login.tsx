import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Lock, Sprout, ArrowRight } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("isLoggedIn", "true");
      setLocation("/profile");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sprout className="w-12 h-12 text-emerald-600" />
            <h1 className="text-4xl font-black text-emerald-950">Photo Insight</h1>
          </div>
          <p className="text-emerald-700 font-medium">Smart Crop Disease Detection</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-emerald-950 mb-6">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 w-5 h-5 text-emerald-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none font-medium"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 w-5 h-5 text-emerald-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none font-medium"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
            >
              {loading ? "Logging in..." : "Sign In"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs font-bold text-amber-900 mb-2">DEMO MODE</p>
            <p className="text-xs text-amber-800">Email: demo@farm.com</p>
            <p className="text-xs text-amber-800">Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
