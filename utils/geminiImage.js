import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeReportImage = async (imagePath) => {
  try {
    const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a medical assistant AI.
Analyze the attached medical report image and explain what the report shows.
Summarize in simple language. Give any important observations in both English and Urdu.
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg",
        },
      },
      prompt,
    ]);

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    throw new Error("Failed to analyze image with Gemini");
  }
};
