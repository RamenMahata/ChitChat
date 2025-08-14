// Vercel API function - entry point for all API routes
// This file routes all API requests to our Express backend
import app from '../backend/src/server.js';

// Export the Express app as a Vercel serverless function
export default app;
