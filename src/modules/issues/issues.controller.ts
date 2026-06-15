import type { Request, Response } from "express";
import type { AuthRequest } from "../auth/auth.interface";
import { issuesService } from "./issues.service";

const createIssue = async (req: AuthRequest, res: Response) => {

  try {
    const reporter_id = req.user?.id as number;

    const result = await issuesService.createIssue(req.body, reporter_id);
    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create issue",
      error: error.message
    });
  }
}

// get all issues
const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { sort, type, status } = req.query as { sort?: string, type?: string, status?: string };
    const result = await issuesService.getAllIssues(sort, type, status);

    res.status(200).json({
      success: true,
      message: "Issues retrieved successfully",
      data: result
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve issues",
      error: error.message
    });
  }
}

// get single issue
const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await issuesService.getSingleIssue(Number(id));

    res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: result
    });

  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Issue not found",
      error: error.message
    });
  }
}

// update issue
const updateIssue = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id as number;
    const userRole = req.user?.role as string;

    const result = await issuesService.updateIssue(
      Number(id),
      req.body,
      userId,
      userRole
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

// delete issue
// delete issue
const deleteIssue = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userRole = req.user?.role as string;

    await issuesService.deleteIssue(Number(id), userRole);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully"
    });

  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: error.message
    });
  }
};

export const issuesController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
}