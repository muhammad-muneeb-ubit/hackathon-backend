import multer from "multer";
import streamifier from "streamifier";
import { cloudinaryConfig, cloudinary } from "../utils/cloudinary.js";
import dotenv from "dotenv";
import FileModel from "../models/file.js";
dotenv.config();
cloudinaryConfig();
const storage = multer.memoryStorage();
export const upload = multer({ storage });
export const fileUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Create a readable stream from buffer
    const bufferStream = streamifier.createReadStream(req.file.buffer);

    // Upload stream to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "react_uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferStream.pipe(stream);
    });

    // console.log("Cloudinary upload result:", result.format);
    let data = {
      public_id: result.public_id,
      url: result.secure_url,
      format: result.format,
      resource_type: result.resource_type,
    };

    let uploadBody = {
        fileID: data.public_id,
        filepath: data.url,
        filetype: data.format,
    }
    let newFile = await FileModel.create(uploadBody);
    console.log("newFile", newFile)

    res.status(200).json({
      message: "Upload successful",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "File upload failed",
      error: error?.message || error,
      status: false,
    });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    res.status(200).json({ success: true, data: file });
  } catch (error) {
    res.status(500).json({
      message: "File retrieval failed",
      error: error?.message || error,
      status: false,
    });
  }
};