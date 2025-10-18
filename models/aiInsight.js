import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema({
  insights: { type: String, required: true },
}, { timestamps: true });

const AIInsight = mongoose.model("AIInsight", aiInsightSchema);
export default AIInsight;
