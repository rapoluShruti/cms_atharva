import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Increase payload size limit for image uploads
  app.use(express.json({ limit: '50mb' }));

  app.post(api.analysis.analyze.path, async (req, res) => {
    try {
      const { image } = req.body; // Expecting base64 string
      
      if (!image) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Extract base64 data if it has data URI prefix
      const base64Data = image.includes(',') ? image.split(',')[1] : image;

      const prompt = `You are an expert Machine Learning Engineer + Agricultural Domain Specialist.
Analyze this crop image carefully.

Identify:
1. Crop type
2. Disease (if any)
3. Cause of disease
4. Natural (organic) cure
5. Chemical cure
6. Preventive measures
7. Confidence score (0-100)
8. Severity level (0-100)

Return ONLY a valid JSON object with this EXACT structure:
{
  "crop": "string",
  "disease": "string",
  "confidence": number,
  "severity": number,
  "causes": ["string"],
  "natural_solution": {
    "description": "string",
    "steps": ["string"]
  },
  "chemical_solution": {
    "description": "string",
    "steps": ["string"]
  },
  "preventive_measures": ["string"]
}

If the image is not a crop or plant, set "crop" to "Unknown" and confidence to 0.
IMPORTANT: Return ONLY the JSON object, no additional text.`;

      // Use Groq API (free, fast, reliable)
      const message = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Image analysis (base64 first 100 chars): ${base64Data.substring(0, 100)}...\n\n${prompt}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
        max_tokens: 2000,
        temperature: 0.7,
      });

      const responseText = message.choices[0]?.message?.content || "";
      
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Invalid response format from AI");
      }

      let result = JSON.parse(jsonMatch[0]);
      
      // Ensure all required fields exist with defaults
      result = {
        crop: result.crop || "Unknown",
        disease: result.disease || "No disease detected",
        confidence: result.confidence || 0,
        severity: result.severity || 0,
        causes: result.causes || [],
        natural_solution: result.natural_solution || { description: "Not available", steps: [] },
        chemical_solution: result.chemical_solution || { description: "Not available", steps: [] },
        preventive_measures: result.preventive_measures || [],
      };
      
      // Save to history
      const savedResult = await storage.saveAnalysis({
        ...result,
        imageUrl: image.substring(0, 100) + "...",
        timestamp: new Date().toISOString(),
      });

      res.json(savedResult);

    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ message: "Failed to analyze image", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get(api.analysis.history.path, async (req, res) => {
    const history = await storage.getHistory();
    res.json(history);
  });

  return httpServer;
}
