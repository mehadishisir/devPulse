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
// get all issues
const getAllIssues = async( sort?:string,type?:string,status?:string)=>{
    let query = `SELECT * FROM issues WHERE 1=1`;
    const params:any[] = [];
    if(type){
        params.push(type);
        query +=` AND type = $${params.length} `;
    }
    if(status){
        params.push(status);
        query +=` AND status = $${params.length} `;
    }
    query +=  sort === "oldest"?`ORDER BY created_at ASC`:`ORDER BY created_at DESC`;   
    const result =await pool.query(query,params);
        return result.rows;
}
export const issuesService = {
    createIssue,
    getAllIssues
}