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
    query +=  sort === "oldest"?` ORDER BY created_at ASC`:` ORDER BY created_at DESC`;  
    
    
    const issuesresult =await pool.query(query,params);
    const issues = issuesresult.rows;
    if(issues.length === 0){
        return [];
    }

    const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

    const reportersResult = await pool.query(
        `SELECT id, name, role FROM users WHERE id = ANY($1)`,
        [reporterIds]
    );
    const reportersMap = new Map(reportersResult.rows.map((reporter) => [reporter.id, reporter]));

    return issues.map((issue) => {
        const { reporter_id, ...rest}=issue;
        return{
            ...rest,
            reporter: reportersMap.get(issue.reporter_id) || null   

        }
    })
       
}
// get single issue
const getSingleIssue = async (id:number)=>{
    const issueResult = await pool.query(`SELECT * FROM issues WHERE id =$1`,[id]);

    const issue = issueResult.rows[0];

    if(!issue){
        throw new Error("Issue not found");
    }

    const reporterResult = await pool.query(`SELECT id,name,role FROM users WHERE id =$1`,[issue.reporter_id]);

    const {reporter_id,...rest} = issue;

    return {
        ...rest,
        reporter: reporterResult.rows[0] || null
    }
}

// update issue
const updateIssue = async (id:number, 
    payload: {title?:string,description?:string,type?:string,status?:string},
    userId:number,
    userRole:string
)=>{
    const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`,[id]);
    const issue = issueResult.rows[0];

    if(!issue){
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
const { title, description, type,status } = payload;

const newStatus = isMaintainer ? status : undefined;

const result = await pool.query(
    `UPDATE issues
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         type = COALESCE($3, type),
         status = COALESCE($4, status),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [title, description, type, newStatus, id]
);
return result.rows[0];
    
}


export const issuesService = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue
}