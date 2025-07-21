import express from 'express'; //Web framework for Node.js
import "dotenv/config"; //For environment variable management
import cookieParser from 'cookie-parser'; //Middleware for parsing cookies

import authRoutes from './routes/auth.routes.js'; //Importing authentication routes
import { connectDb } from './lib/db.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //Middleware to parse JSON bodies
app.use(cookieParser()); //Middleware to parse cookies

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDb(); // Connect to the database when the server starts
    
})