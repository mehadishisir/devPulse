import jwt from "jsonwebtoken";
import config from "../config";
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided"
        });
    }
    try {
        const decoded = jwt.verify(token, config.jwt_secret_key);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token"
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map