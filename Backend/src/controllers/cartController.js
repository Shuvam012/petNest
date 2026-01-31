import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


const getCart = async (req, res) => {
    try {
        const userid = req.user.id;

        let cart = await Cart.findOne({ user: userid }).populate("items.product", " name price image");

        if (!cart) {
            cart = await Cart.create({ user: userid, items: [] })
        }

        // res.status(200).json(cart)
        res.status(200).json({
            items: cart.items,
            totalPrice: cart.totalPrice,
        });


    } catch (error) {
        res.status(500).json({ message: "faild to fetch cart" + error.message });
    }
}


const addToCart = async (req, res) => {
    try {
        const userid = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await Product.findById(productId);

        if (!product || !product.isActive) {
            return res.status(404).json({ message: "Product not found" });
        }
        let cart = await Cart.findOne({ user: userid });
        if (!cart) {
            cart = new Cart({ user: userid, items: [], totalPrice: 0 });
        }


        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price
            });
        }

        cart.totalPrice = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        await cart.save();
        await cart.populate("items.product", "name price image");


        // res.status(200).json(cart);
        res.status(200).json({
            items: cart.items,
            totalPrice: cart.totalPrice,
        });


    } catch (error) {
        res.status(500).json({ message: "failed to add to cart" + error.message });
    }
}

const updateCartItem = async (req, res) => {
    try {
        const userid = req.user.id;
        const { productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }


        const cart = await Cart.findOne({ user: userid });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        item.quantity = quantity;
        cart.totalPrice = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        await cart.save();
        await cart.populate("items.product", "name price image");


        // res.status(200).json(cart);
        res.status(200).json({
            items: cart.items,
            totalPrice: cart.totalPrice,
        });

    } catch (error) {
        res.status(500).json({ message: "failed to update cart item" + error.message });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const userid = req.user.id;
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: userid });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        cart.totalPrice = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );


        await cart.save();
        await cart.populate("items.product", "name price image");

        // res.status(200).json(cart);
        res.status(200).json({
            items: cart.items,
            totalPrice: cart.totalPrice,
        });


    } catch (error) {
        res.status(500).json({ message: "failed to remove from cart" + error.message });
    }
}

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};