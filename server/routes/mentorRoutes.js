import express from "express";
const routes=express.Router();
import {getAllMentors} from "../controllers/mentorControllers.js";

routes.get("/", getAllMentors);

export default routes;
