import express from "express";
import { protect  } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
// import {getAdminStats} from '../controllers/adminController.js'
import { getAdminStats } from "../controllers/adminController.js";

const router = express.Router();


router.get("/dashboard", protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});



router.get("/stats", protect, adminOnly, getAdminStats);

export default  router;