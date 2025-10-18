import express from "express";
import { fileUpload, getFile, upload } from "../controller/file.js";
const router = express.Router()

router.post("/upload", upload.single("file"), fileUpload)
router.get("/:id", getFile)

export default router
