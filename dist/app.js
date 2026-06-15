import express, {} from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { issuesRouter } from "./modules/issues/issues.router";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
// issues routes
app.use('/api/issues', issuesRouter);
app.get("/", (req, res) => {
    res.send("devPulse server running");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map