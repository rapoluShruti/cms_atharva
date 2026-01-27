import { Link, useLocation } from "wouter";
import { Home, MessageCircle, Menu, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white/50 relative shadow-2xl shadow-black/5 overflow-hidden">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-emerald-100/50">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Sprout className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            CropDoctor
          </span>
        </div>
        <button className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-emerald-800">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-emerald-100 px-6 py-4 flex justify-around items-center z-50 safe-bottom">
        <Link href="/">
          <div className={cn(
            "flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer",
            location === "/" ? "text-primary scale-105" : "text-muted-foreground hover:text-emerald-600"
          )}>
            <Home className={cn("w-6 h-6", location === "/" && "fill-current")} />
            <span className="text-xs font-medium">Home</span>
          </div>
        </Link>
        
        <Link href="/chat">
          <div className={cn(
            "flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer",
            location === "/chat" ? "text-primary scale-105" : "text-muted-foreground hover:text-emerald-600"
          )}>
            <MessageCircle className={cn("w-6 h-6", location === "/chat" && "fill-current")} />
            <span className="text-xs font-medium">Expert Chat</span>
          </div>
        </Link>
      </nav>
    </div>
  );
}
