import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




//signup controller
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // const newUser = new User({
        //     username,
        //     email,
        //     password: hashedPassword,
        // });
        // await newUser.save();

        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

//signin controller

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //  SET COOKIE
        res.cookie("token", token, {
            httpOnly: true,
            //   secure: process.env.NODE_ENV === "production",
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
            message: "Login successful",
            role: existingUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// logout controller 

const logoutUser = (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Logout successful" });
};


const getMe = (req, res) => {
    res.status(200).json(req.user);
};


export { signup, loginUser , logoutUser, getMe };