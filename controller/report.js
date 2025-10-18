import { analyzeReportImage } from "../utils/geminiImage.js";

export const analyzeMedicalReport = async (req, res) => {
  try {
    const filePath = req.file.path; // uploaded via multer

    const aiResult = await analyzeReportImage(filePath);

    res.status(200).json({
      success: true,
      message: "Report analyzed successfully",
      aiResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to analyze report",
      error: error.message,
    });
  }
};
