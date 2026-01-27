import jwt from "jsonwebtoken";

//auth middleware

const protect = (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
}


//admin middleware
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Admin access only" });

    next();
};

export { protect, adminOnly };