import { Router } from 'express';
import authRoutes from './authRoutes.js';
import mindMapRoutes from './mindMapRoutes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));
router.use('/auth', authRoutes);
router.use('/mindmaps', mindMapRoutes);

export default router;
