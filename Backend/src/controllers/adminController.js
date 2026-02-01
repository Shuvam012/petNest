// import User from "../models/User.js";
// import Order from "../models/Order.js";
// import Product from "../models/Product.js";

// const getAdminStats = async (req, res) => {
//     try {
//         const totalUsers = await User.countDocuments({ role: "user" });
//         const totalAdmins = await User.countDocuments({ role: "admin" });
//         const totalProducts = await Product.countDocuments();
//         const totalOrders = await Order.countDocuments();

//         // revenue only paid orders
//         const revenueData = await Order.aggregate([
//             {
//                 $match: { paymentStatus: "paid" },
//             },
//             {
//                 $group: {
//                     _id: null,
//                     totalRevenue: { $sum: "$totalAmount" },
//                 },
//             },
//         ]);

//         const totalRevenue =
//             revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

//         // order status
//         const orderStatusStats = await Order.aggregate([
//             {
//                 $group: {
//                     _id: "$orderStatus",
//                     count: { $sum: 1 },
//                 },
//             },
//         ]);

//         res.status(201).json({
//             users: {
//                 totalUsers,
//                 totalAdmins,
//             },
//             products: totalProducts,
//             orders: totalOrders,
//             revenue: totalRevenue,
//             orderStatusStats,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to fetch admin stats",
//             error: error.message,

//         });
//     }
// };

// // module.exports = { getAdminStats };
// export { getAdminStats };


import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // REVENUE AGGREGATION
        const revenueData = await Order.aggregate([
            {
                // During development, we check for 'paid' or 'pending' 
                // so your revenue doesn't stay 0 while testing.
                $match: { 
                    paymentStatus: { $in: ["paid", "pending", "Paid"] } 
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
        ]);

        // Extract totalRevenue or default to 0
        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // ORDER STATUS COUNTS
        const orderStatusStats = await Order.aggregate([
            {
                $group: {
                    _id: "$orderStatus",
                    count: { $sum: 1 },
                },
            },
        ]);

        // Send response
        res.status(200).json({
            users: {
                totalUsers,
            },
            products: totalProducts,
            orders: totalOrders,
            revenue: totalRevenue, // Frontend looks for this key
            orderStatusStats,
        });
    } catch (error) {
        console.error("Admin Stats Error:", error);
        res.status(500).json({
            message: "Failed to fetch admin stats",
            error: error.message,
        });
    }
};

export { getAdminStats };