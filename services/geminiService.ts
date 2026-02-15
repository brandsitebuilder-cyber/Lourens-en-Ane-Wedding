import { GoogleGenAI } from "@google/genai";
import { MessageTone } from "../types";

// Initialize the API client
// Note: In a real production app, ensure API_KEY is strictly protected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateWeddingWish = async (
  relationship: string,
  tone: MessageTone,
  coupleNames: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Returning mock response.");
    return `Wishing you a lifetime of happiness, ${coupleNames}! (AI Unavailable)`;
  }

  try {
    const prompt = `
      Write a wedding guestbook message for a couple named ${coupleNames}.
      The message is from a person who is the "${relationship}" of the couple.
      The tone should be "${tone}".
      Keep it under 50 words.
      Do not include "Dear..." or "Sincerely...", just the body of the message.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for simple text
      }
    });

    return response.text?.trim() || "Best wishes on your special day!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Wishing you both a lifetime of love and happiness!";
  }
};