import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing",
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.json({
                message: "Invalid authorization header"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "string" || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
export default authMiddleware;
//# sourceMappingURL=middleware.js.map