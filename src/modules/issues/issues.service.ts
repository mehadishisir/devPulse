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
export const issuesService = {
    createIssue,
    getAllIssues,
    getSingleIssue
}