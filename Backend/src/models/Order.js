import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: Number,
            price: Number,
        },
    ],
    totalAmount: {
        type: Number,
        required: true,

    },
    paymentMethod: {
        type: String,
        // required: true,
        enum: ["COD", "FAKE"],
        default: "COD"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    orderStatus: {
        type: String,
        enum: ["placed", "shipped", "delivered", "cancelled"],

        default: "placed"
    },
    
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        pincode: String,
}

}, { timestamps: true });


export default mongoose.model("Order", orderSchema);
