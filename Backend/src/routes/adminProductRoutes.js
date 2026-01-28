import express from 'express';
import { createProduct,updateProduct,deleteProduct } from '../controllers/productController.js ';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();


//create product
router.post('/products', protect, adminOnly, createProduct);

//update product
router.put('/products/:id', protect, adminOnly, updateProduct);

//delete product
router.delete('/products/:id', protect, adminOnly, deleteProduct);


export default router;