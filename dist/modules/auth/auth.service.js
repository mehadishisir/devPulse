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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const DB_1 = require("../../DB");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signupService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = payload;
    const existingUser = yield DB_1.pool.query(`
        SELECT * FROM users WHERE email =$1
        `, [email]);
    if (existingUser.rows.length > 0) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    console.log(hashedPassword);
    // return hashedPassword;
    const userRole = role === "maintainer" ? "maintainer" : "contributor";
    const result = yield DB_1.pool.query(`
        INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role,created_at,updated_at
        `, [name, email, hashedPassword, userRole]);
    return result.rows[0];
});
// login service
const loginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const result = yield DB_1.pool.query(`
        SELECT * FROM users WHERE email =$1
        `, [email]);
    if (result.rows.length === 0) {
        throw new Error("Invalid email or password");
    }
    const user = result.rows[0];
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    // jwt token
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, role: user.role }, config_1.default.jwt_secret_key, { expiresIn: "1d" });
    delete user.password;
    return {
        user,
        token
    };
});
exports.authService = {
    signupService,
    loginService
};
