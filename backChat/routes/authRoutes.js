import { Router } from 'express';
import { register, profile, login, logout, messages } from '../controllers/authController.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);

router.get('/messages/:userId', authRequired, messages);

export default router;