import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileID: { type: String, required: true, unique: true },
  filepath: { type: String, required: true },
  filetype: { type: String, required: true },
}, { timestamps: true });

const FileModel = mongoose.model("File", fileSchema);
export default FileModel;
