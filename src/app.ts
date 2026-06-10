import express, { type Request, type Response } from "express";
import { authRoutes } from "./modules/auth/auth.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);

app.get("/",(req:Request,res:Response)=>{
    res.send("devPulse surver running");
})



export default app;

