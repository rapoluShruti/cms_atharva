import { useLocation } from "wouter";
import { useHistory, useAnalyzeImage } from "@/hooks/use-analysis";
import { FileUpload } from "@/components/ui/FileUpload";
import { Sprout, Clock, ChevronRight, Loader2, SearchX } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: history, isLoading: historyLoading } = useHistory();
  const { mutate: analyze, isPending: isAnalyzing } = useAnalyzeImage();

  const handleFileSelect = (base64: string) => {
    analyze({ image: base64 }, {
      onSuccess: (data) => {
        // Pass result via state or cache. 
        // For simplicity with wouter, we could store in global state/context 
        // or just rely on the history update. 
        // Let's pass the data in navigation state if possible, 
        // but wouter state is limited. We'll use local storage or just navigate to history detail if we had IDs.
        // Since the analyze response doesn't give an ID immediately (it might not be persisted yet or backend logic varies),
        // we will pass the result in state if we were using React Router.
        // For now, let's navigate to a special 'latest' view or refetch history.
        // Actually, let's render the result in place or navigate to a Result page passing the object in state.
        
        // BETTER UX: Since wouter doesn't support complex state passing easily without a store, 
        // we'll assume the backend persists it and returns it.
        // If the backend returns the object, we can display it.
        // Let's assume we want to show it immediately.
        // For this demo, I'll store the "lastAnalysis" in localStorage/sessionStorage to pick it up on the result page.
        sessionStorage.setItem("lastAnalysis", JSON.stringify({ result: data, image: base64 }));
        setLocation("/analysis/current");
      }
    });
  };

  return (
    <div className="px-6 py-6 space-y-8">
      {/* Hero Section */}
      <section className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-4xl leading-tight text-emerald-950">
            Heal your crops,<br />
            <span className="text-emerald-600">secure your harvest.</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Instant disease detection with expert-backed cures.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="pt-4">
          <FileUpload onFileSelect={handleFileSelect} isLoading={isAnalyzing} />
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-emerald-50 rounded-xl flex items-center gap-3 text-emerald-800"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Analyzing your crop...</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Recent Scans
          </h2>
        </div>

        {historyLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : history?.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-3xl border border-dashed border-emerald-200">
            <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <SearchX className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-muted-foreground font-medium">No scans yet</p>
            <p className="text-sm text-muted-foreground/80 mt-1">Take a photo to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history?.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  // Re-construct the full object structure expected by the result page
                  // The DB schema stores flattened data, but our UI expects nested objects (natural_cure, etc.)
                  // We need to map it back.
                  const mappedResult = {
                    result: {
                      crop: item.crop,
                      disease: item.disease,
                      confidence: item.confidence,
                      severity: item.severity,
                      causes: item.causes,
                      natural_solution: item.naturalCure as any,
                      chemical_solution: item.chemicalCure as any,
                      preventive_measures: item.prevention
                    },
                    image: item.imageUrl
                  };
                  sessionStorage.setItem("lastAnalysis", JSON.stringify(mappedResult));
                  setLocation("/analysis/view");
                }}
                className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 relative">
                   {/* In a real app we'd load the image URL. For base64 it might be heavy for a list, 
                       but let's assume thumbnail or lazy load. */}
                   {item.imageUrl ? (
                     <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover" />
                   ) : (
                     <Sprout className="w-8 h-8 text-emerald-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 truncate">{item.disease}</h3>
                    <span className="text-[10px] font-medium text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-600 font-medium truncate">{item.crop}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                      <div 
                        className={`h-full rounded-full ${item.severity > 70 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                        style={{ width: `${item.severity}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{item.severity}% Sev</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
