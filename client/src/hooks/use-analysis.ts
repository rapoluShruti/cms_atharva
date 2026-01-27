import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type AnalyzeImageRequest, type AnalysisResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useHistory() {
  return useQuery({
    queryKey: [api.analysis.history.path],
    queryFn: async () => {
      const res = await fetch(api.analysis.history.path);
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.analysis.history.responses[200].parse(await res.json());
    },
  });
}

export function useAnalyzeImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: AnalyzeImageRequest) => {
      const res = await fetch(api.analysis.analyze.path, {
        method: api.analysis.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to analyze image");
      }

      return api.analysis.analyze.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.analysis.history.path] });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
