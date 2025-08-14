import express from 'express'; //Web framework for Node.js
import "dotenv/config"; //For environment variable management
import cookieParser from 'cookie-parser'; //Middleware for parsing cookies
import cors from 'cors'; //Middleware for enabling CORS

import authRoutes from './routes/auth.routes.js'; //Importing authentication routes
import userRoutes from './routes/user.routes.js'; //Importing user-related routes
import chatRoutes from './routes/chat.routes.js'; //Importing chat-related routes
import { connectDb } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration for multiple environments
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173', // Local development
            'http://localhost:3000', // Alternative local port
            process.env.CORS_ORIGIN // Production URL from environment
        ].filter(Boolean); // Remove undefined values
        
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Include credentials in CORS requests
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); //Middleware to parse JSON bodies
app.use(cookieParser()); //Middleware to parse cookies

app.get('/', (req, res) => {
    res.send('Welcome to the Chat Application API');
}); //Basic route for testing

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes); // Assuming you have chat routes


// Connect to database immediately for serverless
connectDb();

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}

// Export the app for Vercel
export default app;