import express from 'express';
import { getAllProducts,getProductById } from '../controllers/productController.js';

const router = express.Router();



//get all products (public)
router.get('/', getAllProducts);

//get product by id (public)
router.get('/:id', getProductById);

export default router;