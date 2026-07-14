import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function listModels() {
  try {
    const models = await ai.models.list();
    let count = 0;
    for await (const model of models) {
      console.log(model.name);
      count++;
      if (count > 20) break;
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
