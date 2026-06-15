import { authService } from "./auth.service";
const signup = async (req, res) => {
    const result = await authService.signupService(req.body);
    // console.log(result);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result
    });
};
const login = async (req, res) => {
    const result = await authService.loginService(req.body);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: result
    });
};
export const authController = {
    signup,
    login
};
//# sourceMappingURL=auth.controller.js.map