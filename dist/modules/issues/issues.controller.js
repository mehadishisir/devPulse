"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issuesController = void 0;
const issues_service_1 = require("./issues.service");
const createIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reporter_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const result = yield issues_service_1.issuesService.createIssue(req.body, reporter_id);
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
});
// get all issues
const getAllIssues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sort, type, status } = req.query;
        const result = yield issues_service_1.issuesService.getAllIssues(sort, type, status);
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
});
// get single issue
const getSingleIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield issues_service_1.issuesService.getSingleIssue(Number(id));
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
});
// update issue
const updateIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        const result = yield issues_service_1.issuesService.updateIssue(Number(id), req.body, userId, userRole);
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
});
// delete issue
// delete issue
const deleteIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        yield issues_service_1.issuesService.deleteIssue(Number(id), userRole);
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
});
exports.issuesController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
};
