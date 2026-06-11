import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "../modules/auth/auth.interface";
import config from "../config";

export const authMiddleware =(req: Request & { user?: JwtPayload },res:Response,next:NextFunction)=>{
 const token = req.headers.authorization;


 if (!token){
    return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided"
    });
 }
 try{
    const decoded = jwt.verify(token,config.jwt_secret_key) as JwtPayload;
    req.user = decoded;
    next();
 } catch (error){
    return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token"
    });
 }
}