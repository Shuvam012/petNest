// import jwt from "jsonwebtoken";

// //auth middleware

// const protect = (req, res, next) => {

//     const token = req.cookies.token

//     if (!token) {
//         return res.status(401).json({ message: "No token, authorization denied" });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Token is not valid" });
//     }
// }




// export { protect };



import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FETCH REAL USER FROM DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 🔥 REAL USER OBJECT
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export { protect };
