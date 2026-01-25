import express from 'express';
import dotenv from 'dotenv';
import connectDB  from './config/db.js';

import Test from './models/test.js';


dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT 

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get("/test-db", async (req, res) => {
  const test = await Test.create({ name: "PetNest DB Test" });
  res.json(test);
});


app.listen(PORT, () => {    
    // console.log(`Server running on port ${PORT}`);
    console.log(`Server running at http://localhost:${PORT}`);
});

