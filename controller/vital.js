import Vital from "../models/vital.js";

export const addVital = async (req, res) => {
  try {
    const { bp, sugar, weight, pulse, note } = req.body;

    const vital = await Vital.create({
      userId: req.user._id,
      bp,
      sugar,
      weight,
      pulse,
      note,
    });

    res.status(201).json({
      success: true,
      message: "Vital added successfully",
      data: vital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add vital",
      error: error.message,
    });
  }
};

export const getVitals = async (req, res) => {
  try {
    const vitals = await Vital.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: vitals });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vitals",
      error: error.message,
    });
  }
};

export const updateVital = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVital = await Vital.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedVital)
      return res.status(404).json({ message: "Vital not found or not authorized" });

    res.status(200).json({
      success: true,
      message: "Vital updated successfully",
      data: updatedVital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update vital",
      error: error.message,
    });
  }
};

export const deleteVital = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Vital.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deleted)
      return res.status(404).json({ message: "Vital not found or not authorized" });

    res.status(200).json({
      success: true,
      message: "Vital deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete vital",
      error: error.message,
    });
  }
};
