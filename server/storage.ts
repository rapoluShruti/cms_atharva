import { AnalysisResult, InsertAnalysisResult } from "@shared/schema";

export interface IStorage {
  saveAnalysis(analysis: InsertAnalysisResult): Promise<AnalysisResult>;
  getHistory(): Promise<AnalysisResult[]>;
}

export class MemStorage implements IStorage {
  private history: AnalysisResult[] = [];
  private currentId = 1;

  async saveAnalysis(analysis: InsertAnalysisResult): Promise<AnalysisResult> {
    const result: AnalysisResult = { ...analysis, id: this.currentId++ };
    this.history.push(result);
    return result;
  }

  async getHistory(): Promise<AnalysisResult[]> {
    return this.history.sort((a, b) => b.id - a.id);
  }
}

export const storage = new MemStorage();
