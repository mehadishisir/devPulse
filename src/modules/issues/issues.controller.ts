import type { Response } from "express";
import type { AuthRequest } from "../auth/auth.interface";
import { issuesService } from "./issues.service";
const createIssue = async (req:AuthRequest,res:Response)=>{

  try{
    const reporter_id = req.user?.id as number;

    const result = await issuesService.createIssue(req.body,reporter_id);
    res.status(201).json({
        success:true,
        message:"Issue created successfully",
        data:result
    }

    );
  } catch (error: any) {
    res.status(500).json({ 
        success: false,
        message: "Failed to create issue",
        error: error.message
    });
  }
}

export const issuesController = {
    createIssue
}