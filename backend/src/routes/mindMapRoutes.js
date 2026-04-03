import { Router } from 'express';
import {
  createMindMap,
  deleteMindMap,
  generateFromText,
  getMindMap,
  getVersionHistory,
  listMindMaps,
  updateMindMap
} from '../controllers/mindMapController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createMindMapValidator, updateMindMapValidator } from '../validators/mindMapValidators.js';

const router = Router();

router.use(requireAuth);
router.get('/', listMindMaps);
router.post('/', createMindMapValidator, validate, createMindMap);
router.get('/:id', getMindMap);
router.put('/:id', updateMindMapValidator, validate, updateMindMap);
router.delete('/:id', deleteMindMap);
router.post('/ai/generate', generateFromText);
router.get('/:id/history', getVersionHistory);

export default router;
