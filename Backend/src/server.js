import dotenv from 'dotenv';
dotenv.config();

import express from 'express';


import cookieParser from 'cookie-parser';
import connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import adminProductRoutes from './routes/adminProductRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import cors from "cors"



// dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // for cookies
  })
)

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);  //admin routes
app.use("/api/admin", adminProductRoutes); //admin product routes
app.use("/api/products", productRoutes); //product routes
app.use("/api/cart", cartRoutes); //cart routes
app.use("/api/orders", orderRoutes); //order routes

// app.use("/api/admin",adminRoutes)






app.listen(PORT, () => {    
    // console.log(`Server running on port ${PORT}`);
    console.log(`Server running at http://localhost:${PORT}`);
});

