import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getProgress } from '../controllers/progress.controller.js';

const router = express.Router();

// router.get('/progress', authMiddleware, getProgress);
router.get('/progress', getProgress);

export default router;