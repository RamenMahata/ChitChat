import jwt from 'jsonwebtoken'; // Library for generating JSON Web Tokens
import User from '../models/User.js'; // User model for database operations

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Get JWT from cookies
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized, no token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token

        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized, invalid token' });
        }

        const user = await User.findById(decoded.userId).select("-password"); // Find user by ID from token
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.user = user; // Attach user to request object

        next(); // Proceed to the next middleware or route handler


    } catch (error) {
        console.log('Error in protectRoute middleware:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors
        
    }
}