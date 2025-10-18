import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔹 Generate health summary based on vitals
export const analyzeVitals = async (vitals) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a health assistant AI.
Given the following patient vitals data, write a short summary of their overall health condition
and suggest one or two recommendations for improvement in English and Urdu both.

Vitals Data:
${JSON.stringify(vitals, null, 2)}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze vitals with Gemini");
  }
};
