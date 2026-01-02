
import { GoogleGenAI, Type } from "@google/genai";
import { LotteryStore, LuckAnalysis } from "../types";

// Always use the named parameter and direct process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeLuck = async (store: LotteryStore, userPrompt: string = ''): Promise<LuckAnalysis> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `
      Analyze this lottery store: "${store.name}" located at "${store.address}".
      It has ${store.winCount1st} first prize wins and ${store.winCount2nd} second prize wins.
      User additional request: "${userPrompt}"
      
      Return a creative and fun "Luck Analysis" for this store in JSON format.
      - score: A luck score out of 100.
      - recommendation: A short catchy recommendation phrase.
      - luckyNumber: 6 unique numbers between 1 and 45.
      - insights: A brief analysis of why this store might be lucky or advice for the user.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          recommendation: { type: Type.STRING },
          luckyNumber: { 
            type: Type.ARRAY, 
            items: { type: Type.NUMBER }
          },
          insights: { type: Type.STRING }
        },
        required: ["score", "recommendation", "luckyNumber", "insights"]
      }
    }
  });

  // Extract text using the .text property and trim it before parsing.
  const jsonStr = (response.text || '{}').trim();
  return JSON.parse(jsonStr) as LuckAnalysis;
};
