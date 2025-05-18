import express from "express";
const routes = express.Router();
import {  getChatList, getNotification, postNotification,authenticateUser, respondToNotification } from "../controllers/NotificationsController.js";

routes.get("/chat-list", authenticateUser, getChatList);
routes.get("/:email", getNotification); 
routes.post("/", postNotification);
routes.put("/respond", respondToNotification);

export default routes;