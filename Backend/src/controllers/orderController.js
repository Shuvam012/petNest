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


/**
 * get all orders (admin)
 */
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", " email role")
        .populate("items.product", " name price ")
        .sort({createdAt: -1});

        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch orders: " + error.message });
    }
}

export { placeOrder, getMyOrders, getAllOrders };

