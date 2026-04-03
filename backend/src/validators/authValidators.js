import { body } from 'express-validator';

export const signupValidator = [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];
