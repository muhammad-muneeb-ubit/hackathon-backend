import express from "express";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/api/report/image", upload.single("file"), (req, res) => {
  console.log("✅ Route hit:", req.file?.originalname);
  res.json({ success: true, message: "File received" });
});

app.listen(5001, () => console.log("Test server on http://localhost:5001"));
