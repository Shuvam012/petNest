
import express from "express";
import { createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// create product
router.post(
    "/products",
    protect,
    adminOnly,
    upload.single("image"),//middleware
    createProduct
);

// update product
router.put(
    "/products/:id",
    protect,
    adminOnly,
    upload.single("image"),//middleware 
    updateProduct
);

// delete product
router.delete(
    "/products/:id",
    protect,
    adminOnly,
    deleteProduct
);

export default router;
