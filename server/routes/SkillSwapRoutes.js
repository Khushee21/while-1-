import express from "express";
const routes=express.Router();
import { getAllSkillMates } from "../controllers/SkillSwapController.js";

routes.get("/", getAllSkillMates);

export default routes;