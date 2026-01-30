import express from 'express';
import { signup,loginUser, logoutUser ,getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';



const router = express.Router();

//signup route
router.post('/signup', signup); 

//signin route
router.post('/login', loginUser);

//logout route
router.post('/logout', logoutUser)


//get current user
router.get('/me', protect, getMe);

export default router;