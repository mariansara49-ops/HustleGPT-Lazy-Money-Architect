import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BusinessIdea, BusinessPlan, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelFlash = 'gemini-2.5-flash';

// Schema for Business Idea
const businessIdeaSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Catchy title for the business idea" },
    description: { type: Type.STRING, description: "A 2-sentence description of the idea" },
    effortLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "Effort required to maintain" },
    potentialRevenue: { type: Type.STRING, description: "Estimated monthly earnings range (e.g., '$500 - $2000')" },
    setupTime: { type: Type.STRING, description: "Time to launch (e.g., '2 hours')" },
    tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 keywords related to the niche" }
  },
  required: ["title", "description", "effortLevel", "potentialRevenue", "setupTime", "tags"]
};

// Schema for Business Plan
const businessPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: "Brief executive summary" },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          details: { type: Type.STRING }
        }
      },
      description: "5 step actionable plan"
    },
    marketingHook: { type: Type.STRING, description: "One viral marketing angle" }
  },
  required: ["summary", "steps", "marketingHook"]
};

export const generateLazyIdea = async (niche?: string): Promise<BusinessIdea> => {
  const prompt = niche 
    ? `Give me a "lazy" automated money-making idea in the ${niche} niche. It should rely on AI, automation, or digital assets.`
    : `Give me a random, unique "lazy" money-making side hustle idea. Focus on arbitrage, AI automation, or digital products. Make it sound exciting but realistic.`;

  const response = await ai.models.generateContent({
    model: modelFlash,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: businessIdeaSchema,
      temperature: 1.2 // High temperature for creativity
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as BusinessIdea;
};

export const generateExecutionPlan = async (idea: BusinessIdea): Promise<BusinessPlan> => {
  const prompt = `Create a ruthless, efficient execution plan for this business idea: "${idea.title}: ${idea.description}". Focus on speed to market and using AI tools to do the work.`;

  const response = await ai.models.generateContent({
    model: modelFlash,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: businessPlanSchema,
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as BusinessPlan;
};

export const generateMarketingContent = async (idea: BusinessIdea, contentType: 'Tweet' | 'Ad Copy' | 'Email'): Promise<GeneratedContent> => {
  const prompt = `Write a high-converting ${contentType} for the business "${idea.title}". 
  Context: ${idea.description}.
  Tone: Persuasive, punchy, and professional.`;

  const response = await ai.models.generateContent({
    model: modelFlash,
    contents: prompt,
  });

  if (!response.text) throw new Error("No response from AI");
  
  return {
    type: contentType,
    text: response.text
  };
};