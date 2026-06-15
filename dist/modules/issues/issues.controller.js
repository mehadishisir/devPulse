import { issuesService } from "./issues.service";
const createIssue = async (req, res) => {
    try {
        const reporter_id = req.user?.id;
        const result = await issuesService.createIssue(req.body, reporter_id);
        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create issue",
            error: error.message
        });
    }
};
// get all issues
const getAllIssues = async (req, res) => {
    try {
        const { sort, type, status } = req.query;
        const result = await issuesService.getAllIssues(sort, type, status);
        res.status(200).json({
            success: true,
            message: "Issues retrieved successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve issues",
            error: error.message
        });
    }
};
// get single issue
const getSingleIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await issuesService.getSingleIssue(Number(id));
        res.status(200).json({
            success: true,
            message: "Issue retrieved successfully",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Issue not found",
            error: error.message
        });
    }
};
// update issue
const updateIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const userRole = req.user?.role;
        const result = await issuesService.updateIssue(Number(id), req.body, userId, userRole);
        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// delete issue
// delete issue
const deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const userRole = req.user?.role;
        await issuesService.deleteIssue(Number(id), userRole);
        res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
        });
    }
    catch (error) {
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
};
//# sourceMappingURL=issues.controller.js.map