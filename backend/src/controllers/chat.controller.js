import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = generateStreamToken(req.user.id); // Generate Stream token for the user
        res.status(200).json({
            token
        });
    } catch (error) {
        console.error("Error fetching Stream token:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
