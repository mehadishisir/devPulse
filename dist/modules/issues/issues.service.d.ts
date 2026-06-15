import type { IIssue } from "./issues.interface";
export declare const issuesService: {
    createIssue: (payload: IIssue, reporterId: number) => Promise<any>;
    getAllIssues: (sort?: string, type?: string, status?: string) => Promise<any[]>;
    getSingleIssue: (id: number) => Promise<any>;
    updateIssue: (id: number, payload: {
        title?: string;
        description?: string;
        type?: string;
        status?: string;
    }, userId: number, userRole: string) => Promise<any>;
    deleteIssue: (id: number, userRole: string) => Promise<any>;
};
//# sourceMappingURL=issues.service.d.ts.map