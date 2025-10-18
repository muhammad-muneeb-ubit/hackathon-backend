import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bp: {
      type: String, // Example: "120/80"
    },
    sugar: {
      type: String, // Example: "95 mg/dL"
    },
    weight: {
      type: String, // Example: "65 kg"
    },
    pulse: {
      type: String, // Optional: "72 bpm"
    },
    note: {
      type: String, // Example: "Morning check after breakfast"
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const vital = mongoose.model("Vital", vitalSchema);
export default vital;
