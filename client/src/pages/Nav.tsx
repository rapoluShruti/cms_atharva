import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  MapPin,
  Home,
  MessageCircle,
  User,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";

/* ---------------- TYPES ---------------- */
type NavLink = {
  path: string;
  label: string;
  icon?: LucideIcon;
};

/* ---------------- DATA ---------------- */
const navLinks: NavLink[] = [
  { path: "/", label: "Crop Selection", icon: Home },
  { path: "/home", label: "Home", icon: Home },
  { path: "/map", label: "Farmer Map", icon: MapPin },
  { path: "/analysis/current", label: "Analysis", icon: BarChart3 },
  { path: "/chat", label: "AI Chat", icon: MessageCircle },
  { path: "/weather", label: "Weather Alerts" },
  { path: "/withdrawal", label: "Withdrawal Tracker" },
  { path: "/schemes", label: "Gov Schemes" },
  { path: "/helpline", label: "Helpline" },
  { path: "/profile", label: "Profile", icon: User },
];

/* ---------------- COMPONENT ---------------- */
const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl text-emerald-700">
              🌱 AgriAI
            </a>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link key={path} href={path}>
                <a
                  className={`flex items-center gap-1 text-sm font-medium transition
                    ${
                      location === path
                        ? "text-emerald-700 border-b-2 border-emerald-600"
                        : "text-gray-600 hover:text-emerald-600"
                    }
                  `}
                >
                  {Icon && <Icon size={16} />}
                  {label}
                </a>
              </Link>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="md:hidden text-gray-700"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden bg-white border-t border-emerald-100 shadow-lg">
          <div className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map(({ path, label }) => (
              <Link key={path} href={path}>
                <a
                  onClick={() => setOpen(false)}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition
                    ${
                      location === path
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-700 hover:bg-emerald-50"
                    }
                  `}
                >
                  {label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
