
import express from "express";
import { createProduct, updateProduct, deleteProduct ,getAllProductsAdmin,activeProduct} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// ✅ GET ALL PRODUCTS (ADMIN)
router.get(
  "/products",
  protect,
  adminOnly,
  getAllProductsAdmin
);

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

// active product
router.put(
    "/products/active/:id",
    protect,
    adminOnly,
    activeProduct
);

export default router;
