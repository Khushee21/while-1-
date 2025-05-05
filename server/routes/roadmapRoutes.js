import express from 'express';
import getRoadmapByTech from '../controllers/roadmapController.js';


const router = express.Router();

router.get("/:tech", getRoadmapByTech);

export default router;
