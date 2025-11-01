import { upsertStreamUser } from '../lib/stream.js';
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
        });

        // Upsert user in Stream
        try {
            await upsertStreamUser({
                id: newUser._id.toString(), // Use string representation of ObjectId
                name: newUser.fullName,
                image: newUser.profilePic || '', // Use default profile picture if not set
            });
            console.log(`Stream user upserted successfully for user: ${newUser.fullName}`);
        } catch (error) {
           console.log(`Error upserting Stream user for ${newUser.fullName}:`, error);
            
        }


        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'}); // Generate JWT token
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Helps prevent CSRF attacks // Helps prevent cross-site request forgery
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        });

        res.status(201).json({
            success: true,
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                bio: newUser.bio,
                profilePic: newUser.profilePic,
                nativeLanguage: newUser.nativeLanguage,
                learningLanguage: newUser.learningLanguage,
                location: newUser.location,
                isOnboarded: newUser.isOnboarded,
                friends: newUser.friends,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            },
            message: 'User created successfully',
        })

        
    } catch (error) {
        console.log('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'}); // Generate JWT token
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Helps prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        });

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                bio: user.bio,
                profilePic: user.profilePic,
                nativeLanguage: user.nativeLanguage,
                learningLanguage: user.learningLanguage,
                location: user.location,
                isOnboarded: user.isOnboarded,
                friends: user.friends,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            message: 'Login successful',
        });

    } catch (error) {
        console.log('Error in login controller:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
export function logout(req, res) {
    res.clearCookie('jwt'); // Clear the JWT cookie
    res.status(200).json({ message: 'Logout successful' }); // Respond with success message
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id; // Get user ID from the request object

        const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({ 
                message: 'All fields are required',
                missingFields: [
                    !fullName && 'fullName',
                    !bio && 'bio',
                    !nativeLanguage && 'nativeLanguage',
                    !learningLanguage && 'learningLanguage',
                    !location && 'location'
                ].filter(Boolean), // Filter out undefined values
            });
        }
        const updateUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true // Set isOnboarded to true
        }, {new:true}); // Return the updated user document
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });

        }
        // TODO: Upsert user in Stream with updated data
        try {
            await upsertStreamUser({
            id: updateUser._id.toString(), // Use string representation of ObjectId
            name: updateUser.fullName,
            image: updateUser.profilePic || '', // Use default profile picture if not set
        });
        console.log(`Stream user upserted successfully for user: ${updateUser.fullName}`);
        
        } catch (streamError) {
            console.error("Error upserting Stream user:", streamError.message);
            return res.status(500).json({ message: 'Internal server error while upserting Stream user' });
            
        }
        

        res.json({
            success: true,
            user: {
                _id: updateUser._id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                bio: updateUser.bio,
                profilePic: updateUser.profilePic,
                nativeLanguage: updateUser.nativeLanguage,
                learningLanguage: updateUser.learningLanguage,
                location: updateUser.location,
                isOnboarded: updateUser.isOnboarded,
                friends: updateUser.friends,
                createdAt: updateUser.createdAt,
                updatedAt: updateUser.updatedAt
            },
            message: 'Onboarding successful',
        });
    } catch (error) {
        console.error('Error during onboarding:', error);
        res.status(500).json({ message: 'Internal server error during onboarding' });
    }
}