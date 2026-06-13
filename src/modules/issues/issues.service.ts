import { pool } from "../../DB";
import type { IIssue } from "./issues.interface";

const createIssue = async (payload:IIssue,reporterId:number) => {
const{title,description,type}=payload;

const result = await pool.query(
    `INSERT INTO issues (title,description,type,reporter_id) VALUES ($1,$2,$3,$4) RETURNING *`,
    [title,description,type,reporterId]
)
return result.rows[0];
}
export const issuesService = {
    createIssue
}