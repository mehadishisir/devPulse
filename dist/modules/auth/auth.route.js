"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.authController.signup);
router.post('/login', auth_controller_1.authController.login);
router.get('/me', auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
exports.authRoutes = router;
