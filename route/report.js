import express from "express";
import { protect } from "../midddleware/auth.js";
import { analyzeMedicalReport } from "../controller/report.js";


const reportRouter = express.Router();

reportRouter.use(protect);
reportRouter.post("/image", analyzeMedicalReport);

export default reportRouter;
