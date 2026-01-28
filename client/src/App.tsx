import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Analysis from "@/pages/Analysis";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import FarmerMap from "@/pages/Map";
import CropSelection from "@/pages/CropSelection";

import WithdrawalTracker from "@/pages/WithdrawalTracker";
import WeatherAlerts from "@/pages/WeatherAlerts";
import GovernmentSchemes from "@/pages/GovernmentSchemes";
import HelplineAccess from "@/pages/HelplineAccess";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";


import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Abc from "./pages/Abc";
import DclDemo from "./pages/DclDemo";
import Navbar from "./pages/Nav";


function Router() {
  return (
  <>
<Navbar/>
    <Switch>
      
      <Route path="/" component={CropSelection}/>
      <Route path="/home" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/map" component={FarmerMap}/>
      <Route path="/analysis/current" component={Analysis}/>
      <Route path="/analysis/view" component={Analysis}/>
      <Route path="/chat" component={Chat}/>
         <Route path="/demo" component={Demo}/>
      <Route path="/withdrawal" component={WithdrawalTracker}/>
      <Route path="/weather" component={WeatherAlerts}/>
      <Route path="/schemes" component={GovernmentSchemes}/>
      <Route path="/helpline" component={HelplineAccess}/>

      <Route path="/digital" component={Dashboard}/>
        <Route path="/dcl" component={DclDemo}/>
  
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    // Google Translate Widget Setup
    (window as any).gtranslateSettings = {
      default_language: "en",
      languages: [
        "en", "es", "fr", "de", "zh", "ja", "ar", "pt", "hi", "ru"
      ],
      wrapper_selector: ".gtranslate_wrapper",
      flag_size: 28,
      horizontal_position: "right",
      vertical_position: "top",
      native_language_names: true,
    };

    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {
        // Script already removed
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-emerald-50/30">
        {/* Google Translate Widget */}
        <div className="gtranslate_wrapper" style={{ position: "fixed", top: "10px", right: "10px", zIndex: 9999 }}></div>
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Toaster />
          <Router />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
