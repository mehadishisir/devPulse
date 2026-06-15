import { Router } from 'express';
import { authController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
const router = Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
export const authRoutes = router;
//# sourceMappingURL=auth.route.js.map