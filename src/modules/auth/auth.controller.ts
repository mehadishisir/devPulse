import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
   const result = await authService.signupService(req.body);
    // console.log(result);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result
    })
}
export const authController = {
    signup
} 