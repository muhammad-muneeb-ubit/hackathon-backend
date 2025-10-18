import Vital from "../models/vital.js";
import { analyzeVitals } from "../utils/gemini.js";

export const getHealthSummary = async (req, res) => {
  try {
    // Fetch last 7 days vitals for this user
    const vitals = await Vital.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(7);

    if (!vitals.length)
      return res.status(404).json({ message: "No vitals data found" });

    // Analyze using Gemini
    const aiSummary = await analyzeVitals(vitals);

    res.status(200).json({
      success: true,
      message: "AI health summary generated successfully",
      data: { aiSummary },
    });
  } catch (error) {
    console.error("AI Summary Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI summary",
      error: error.message,
    });
  }
};
