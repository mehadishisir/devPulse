import express, { type Request, type Response } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import { issuesRouter } from "./modules/issues/issues.router";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);
// issues routes
app.use('/api/issues', issuesRouter);

app.get("/",(req:Request,res:Response)=>{
    res.send("devPulse surver running");
})



export default app;

