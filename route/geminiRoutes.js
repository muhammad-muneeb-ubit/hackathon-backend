import express from "express";
import { getHealthSummary } from "../controller/geminiController.js";
import { protect } from "../midddleware/auth.js";


const geminiRouter = express.Router();

geminiRouter.use(protect);
geminiRouter.get("/summary",  getHealthSummary);

export default geminiRouter;
