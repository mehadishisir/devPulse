import { pool } from "../../DB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
const signupService = async (payload) => {
    const { name, email, password, role } = payload;
    const existingUser = await pool.query(`
        SELECT * FROM users WHERE email =$1
        `, [email]);
    if (existingUser.rows.length > 0) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // return hashedPassword;
    const userRole = role === "maintainer" ? "maintainer" : "contributor";
    const result = await pool.query(`
        INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role,created_at,updated_at
        `, [name, email, hashedPassword, userRole]);
    return result.rows[0];
};
// login service
const loginService = async (payload) => {
    const { email, password } = payload;
    const result = await pool.query(`
        SELECT * FROM users WHERE email =$1
        `, [email]);
    if (result.rows.length === 0) {
        throw new Error("Invalid email or password");
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    // jwt token
    const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, config.jwt_secret_key, { expiresIn: "1d" });
    delete user.password;
    return {
        user,
        token
    };
};
export const authService = {
    signupService,
    loginService
};
//# sourceMappingURL=auth.service.js.map