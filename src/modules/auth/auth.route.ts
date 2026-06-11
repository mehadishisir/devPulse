import { Router, type Request, type Response } from 'express';
import { authController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: (req as any).user });
});

export const authRoutes = router;