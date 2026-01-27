import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB  from './config/db.js';
// import authRoutes from '../routes/authRoutes.js';
import authRoutes from './routes/authRoutes.js';



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT 

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);






app.listen(PORT, () => {    
    // console.log(`Server running on port ${PORT}`);
    console.log(`Server running at http://localhost:${PORT}`);
});

