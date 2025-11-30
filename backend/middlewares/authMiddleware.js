const jwt = require('jsonwebtoken');

const userAuthentication = async (req, res, next) => {
    try {
        let token = "";

        // 1. Try Bearer token from Authorization header (most common)
        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } 
        // 2. Try accessToken from HttpOnly cookie (your current setup)
        else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;   // ← correct way
        }



        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded;  // attach user info to request
        next();

    } catch (error) {
        console.error("JWT Verification Failed:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};


module.exports = { userAuthentication };