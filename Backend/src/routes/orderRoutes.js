import express from 'express';
import {
    placeOrder,
    getMyOrders,
    getAllOrders
} from '../controllers/orderController.js';


import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

/**
 * user routes
 */


// place order from cart
router.post('/place', protect, placeOrder);

// get user orders
router.get('/my', protect, getMyOrders);


/**
 * admin routes
 */

// get all orders
router.get('/admin/all', protect, adminOnly, getAllOrders);


export default router;


