import { body } from 'express-validator';

export const createMindMapValidator = [
  body('title').trim().isLength({ min: 1, max: 120 }),
  body('template').optional().isIn(['blank', 'study', 'business', 'startup', 'notes'])
];

export const updateMindMapValidator = [
  body('title').optional().trim().isLength({ min: 1, max: 120 }),
  body('visibility').optional().isIn(['private', 'public']),
  body('nodes').optional().isArray(),
  body('edges').optional().isArray()
];
