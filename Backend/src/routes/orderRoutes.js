import express from 'express';
import {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
} from '../controllers/orderController.js';


import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
// import { updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

/**
 * user routes
 */


// place order from cart
router.post('/place', protect, placeOrder);

// get user orders
router.get('/my', protect, getMyOrders);

// cancel order
router.delete('/cancel/:orderId', protect, cancelOrder);




/**
 * admin routes
 */

// get all orders
router.get('/admin/all', protect, adminOnly, getAllOrders);

// update order status
router.put('/admin/update/:orderId', protect, adminOnly, updateOrderStatus);


export default router;


