"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./modules/auth/auth.route");
const issues_router_1 = require("./modules/issues/issues.router");
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/auth', auth_route_1.authRoutes);
// issues routes
app.use('/api/issues', issues_router_1.issuesRouter);
app.get("/", (req, res) => {
    res.send("devPulse server running");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
