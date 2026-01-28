import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// get user cart
router.get("/", protect, getCart);

// add to cart
router.post("/add", protect, addToCart);

// update cart item
router.put("/update", protect, updateCartItem);

// remove from cart
router.delete("/remove", protect, removeFromCart);

export default router;