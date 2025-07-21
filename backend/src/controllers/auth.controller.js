import User from '../models/User.js'; // Importing User model
import jwt from 'jsonwebtoken'; // Library for generating JSON Web Tokens

export async function signup(req, res) {

    const {email, password, fullName }= req.body;

    try {
        if(!email || !password || !fullName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists, please use a different one.' });
        }

        const idx = Math.floor(Math.random() * 100) + 1; // Random index for profile picture
        const profilePic = `https://avatar.iran.liara.run/public/${idx}.png`; // Default profile picture URL

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic, // Assigning default profile picture
        })

        // TODO: Create a user in stream as well

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'}); // Generate JWT token
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Helps prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        });

        res.status(201).json({
            success: true,
            user: newUser,
            message: 'User created successfully',
        })

        
    } catch (error) {
        console.log('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
export async function login(req, res) {
    res.send('Login Route');
}
export function logout(req, res) {
    res.send('Logout Route');
}