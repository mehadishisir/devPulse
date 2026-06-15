import type { IUser } from "./auth.interface";
export declare const authService: {
    signupService: (payload: IUser) => Promise<any>;
    loginService: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        user: any;
        token: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map