import { Router } from 'express';
import { googleLogin, login, signup } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { loginValidator, signupValidator } from '../validators/authValidators.js';

const router = Router();

router.post('/signup', signupValidator, validate, signup);
router.post('/login', loginValidator, validate, login);
router.post('/google', googleLogin);

export default router;
