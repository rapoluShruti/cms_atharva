import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Analysis from "@/pages/Analysis";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/analysis/current" component={Analysis}/>
          <Route path="/analysis/view" component={Analysis}/>
          <Route path="/chat" component={Chat}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
