import { z } from 'zod';
import { analyzeImageSchema, analysisResponseSchema, analysisResults } from './schema';

export const api = {
  analysis: {
    analyze: {
      method: 'POST' as const,
      path: '/api/analyze',
      input: analyzeImageSchema,
      responses: {
        200: analysisResponseSchema,
        400: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
    history: {
      method: 'GET' as const,
      path: '/api/history',
      responses: {
        200: z.array(z.custom<typeof analysisResults.$inferSelect>()),
      },
    },
  },
};
