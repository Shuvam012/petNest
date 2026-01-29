import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


/**
 * placeOrder
 * cart to order
 */

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { paymentMethod, shippingAddress } = req.body;

        //get user cart
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderItems = []
        let totalAmount = 0;

        for (const item of cart.items) {
            const product = item.product;

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }



            // reduce product stock
            product.stock -= item.quantity;
            await product.save();

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: item.price
            });
            totalAmount += item.price * item.quantity;
        }

        // create order
        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount,
            paymentMethod: paymentMethod || "COD",
            paymentStatus: "Pending",
            shippingAddress
        });

        // clear user cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to place order: " + error.message });
    }
}


/**
 * Get User Orders
 */

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product", "name price image")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders: " + error.message });
    }
}



//cancel order
const cancelOrder = async (req,res) =>{
    try{
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await Order.findById(orderId).populate("items.product");

        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }

        //check if order belongs to user
        if(order.user.toString() !== userId){
            return res.status(403).json({ message: "Unauthorized action" });
        }

        //placed orders can only be cancelled
        if(order.orderStatus !== "placed"){
            return res.status(400).json({ message: "Only placed orders can be cancelled" });
        }

        //restore product stock
        for(const item of order.items){
            item.product.stock += item.quantity;
            await item.product.save();
        }

        order.orderStatus = "cancelled";
        await order.save();

        res.status(200).json({ message: "Order cancelled successfully", order });
    }
    catch(error){
        res.status(500).json({ message: "Failed to cancel order: " + error.message });
    }   
}


/**
 * get all orders (admin)
 */
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", " email role")
            .populate("items.product", " name price ")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch orders: " + error.message });
    }
}


// update order status (admin) 
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params
        const { orderStatus, paymentStatus } = req.body

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // changing delivery status
        if (order.orderStatus === "delivered") {
            return res.status(400).json({ message: "Order already delivered" });
        }
        if (orderStatus) {
            order.orderStatus = orderStatus;
        }
        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }

        await order.save();

        res.status(200).json({ 
            message: "Order status updated successfully", 
            order 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Failed to update order status: " + 
            error.message 
        });
    }
}




export { placeOrder, getMyOrders, getAllOrders, updateOrderStatus , cancelOrder};

