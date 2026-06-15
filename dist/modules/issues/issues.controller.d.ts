import type { Request, Response } from "express";
import type { AuthRequest } from "../auth/auth.interface";
export declare const issuesController: {
    createIssue: (req: AuthRequest, res: Response) => Promise<void>;
    getAllIssues: (req: Request, res: Response) => Promise<void>;
    getSingleIssue: (req: Request, res: Response) => Promise<void>;
    updateIssue: (req: AuthRequest, res: Response) => Promise<void>;
    deleteIssue: (req: AuthRequest, res: Response) => Promise<void>;
};
//# sourceMappingURL=issues.controller.d.ts.map