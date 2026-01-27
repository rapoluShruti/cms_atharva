import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  crop: text("crop").notNull(),
  disease: text("disease").notNull(),
  confidence: integer("confidence").notNull(),
  severity: integer("severity").notNull(),
  causes: text("causes").array().notNull(),
  natural_solution: jsonb("natural_solution").notNull(),
  chemical_solution: jsonb("chemical_solution").notNull(),
  preventive_measures: text("preventive_measures").array().notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertAnalysisSchema = createInsertSchema(analysisResults).omit({ id: true });

export type AnalysisResult = typeof analysisResults.$inferSelect;
export type InsertAnalysisResult = z.infer<typeof insertAnalysisSchema>;

// API Schemas
export const analyzeImageSchema = z.object({
  image: z.string(), // Base64 string
});

export const analysisResponseSchema = z.object({
  crop: z.string(),
  disease: z.string(),
  confidence: z.number(),
  severity: z.number(),
  causes: z.array(z.string()),
  natural_solution: z.object({
    description: z.string(),
    steps: z.array(z.string()),
  }),
  chemical_solution: z.object({
    description: z.string(),
    steps: z.array(z.string()),
  }),
  preventive_measures: z.array(z.string()),
});

export type AnalyzeImageRequest = z.infer<typeof analyzeImageSchema>;
export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;
