import type { Request } from "express";
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "contributor" | "maintainer";
}
export interface JwtPayload {
    id: number;
    name: string;
    role: "contributor" | "maintainer";
}
export interface AuthRequest extends Request {
    user?: JwtPayload;
}
//# sourceMappingURL=auth.interface.d.ts.map