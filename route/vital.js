import express from "express";
import { addVital, deleteVital, getVitals, updateVital } from "../controller/vital.js";
import { protect } from "../midddleware/auth.js";

const vitalRouter = express.Router()
vitalRouter.use(protect)


vitalRouter.get("/", getVitals)
vitalRouter.post("/", addVital)
vitalRouter.put("/:id", updateVital)
vitalRouter.delete("/:id", deleteVital)

export default vitalRouter;
