import express from 'express';
import { signup,loginUser, logoutUser } from '../controllers/authController.js';


const router = express.Router();

//signup route
router.post('/signup', signup); 

//signin route
router.post('/login', loginUser);

//logout route
router.post('/logout', logoutUser)

export default router;