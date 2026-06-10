import { pool } from "../../DB";
import bcrypt from "bcrypt";
import type { IUser } from "./auth.interface";

const signupService = async(payload:IUser)=>{

    const {name,email,password,role}=payload;

    const existingUser = await pool.query(`
        SELECT * FROM users WHERE email =$1
        `,[email]);
    
        if(existingUser.rows.length>0){
            throw new Error("User already exists");
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // return hashedPassword;
        const userRole = role === "maintainer" ? "maintainer" : "contributor";
 const result = await pool.query(`
        INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role,created_at,updated_at
        `,
        [name,email,hashedPassword,userRole]);
       
        return result.rows[0];
}
export const authService = {
    signupService
};