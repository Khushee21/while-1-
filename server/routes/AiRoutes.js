import express from 'express';
const router = express.Router();

import PostAiForInterview from "../controllers/AiControllers.js";

router.post("/ask-ai" , PostAiForInterview);

export default router;