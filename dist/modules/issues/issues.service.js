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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issuesService = void 0;
const DB_1 = require("../../DB");
const createIssue = (payload, reporterId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, type } = payload;
    const result = yield DB_1.pool.query(`INSERT INTO issues (title,description,type,reporter_id) VALUES ($1,$2,$3,$4) RETURNING *`, [title, description, type, reporterId]);
    return result.rows[0];
});
// get all issues
const getAllIssues = (sort, type, status) => __awaiter(void 0, void 0, void 0, function* () {
    let query = `SELECT * FROM issues WHERE 1=1`;
    const params = [];
    if (type) {
        params.push(type);
        query += ` AND type = $${params.length} `;
    }
    if (status) {
        params.push(status);
        query += ` AND status = $${params.length} `;
    }
    query += sort === "oldest" ? ` ORDER BY created_at ASC` : ` ORDER BY created_at DESC`;
    const issuesresult = yield DB_1.pool.query(query, params);
    const issues = issuesresult.rows;
    if (issues.length === 0) {
        return [];
    }
    const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
    const reportersResult = yield DB_1.pool.query(`SELECT id, name, role FROM users WHERE id = ANY($1)`, [reporterIds]);
    const reportersMap = new Map(reportersResult.rows.map((reporter) => [reporter.id, reporter]));
    return issues.map((issue) => {
        const { reporter_id } = issue, rest = __rest(issue, ["reporter_id"]);
        return Object.assign(Object.assign({}, rest), { reporter: reportersMap.get(issue.reporter_id) || null });
    });
});
// get single issue
const getSingleIssue = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const issueResult = yield DB_1.pool.query(`SELECT * FROM issues WHERE id =$1`, [id]);
    const issue = issueResult.rows[0];
    if (!issue) {
        throw new Error("Issue not found");
    }
    const reporterResult = yield DB_1.pool.query(`SELECT id,name,role FROM users WHERE id =$1`, [issue.reporter_id]);
    const { reporter_id } = issue, rest = __rest(issue, ["reporter_id"]);
    return Object.assign(Object.assign({}, rest), { reporter: reporterResult.rows[0] || null });
});
// update issue
const updateIssue = (id, payload, userId, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const issueResult = yield DB_1.pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);
    const issue = issueResult.rows[0];
    if (!issue) {
        throw new Error("Issue not found");
    }
    const isMaintainer = userRole === "maintainer";
    const isOwner = issue.reporter_id === userId;
    if (!isMaintainer) {
        if (!isOwner) {
            throw new Error("You can update only your own issue");
        }
        if (issue.status !== "open") {
            throw new Error("You can update only 'open' issues");
        }
    }
    const { title, description, type, status } = payload;
    const newStatus = isMaintainer ? status : undefined;
    const result = yield DB_1.pool.query(`UPDATE issues
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         type = COALESCE($3, type),
         status = COALESCE($4, status),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`, [title, description, type, newStatus, id]);
    return result.rows[0];
});
// delete issue
const deleteIssue = (id, userRole) => __awaiter(void 0, void 0, void 0, function* () {
    if (userRole !== "maintainer") {
        throw new Error("Only maintainers can delete issues");
    }
    const result = yield DB_1.pool.query(`DELETE FROM issues WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) {
        throw new Error("Issue not found");
    }
    return result.rows[0];
});
exports.issuesService = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
};
