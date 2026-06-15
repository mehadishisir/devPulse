import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "../modules/auth/auth.interface";
export declare const authMiddleware: (req: Request & {
    user?: JwtPayload;
}, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map