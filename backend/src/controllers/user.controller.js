import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {

    try {
        const currentUserId = req.user.id; // Get the current user's ID from the request object
        const currentUser = req.user; // Get the current user object

        const recommendedUsers = await User.find({
            $and: [
                {_id: { $ne: currentUserId } }, // Exclude the current user
                { isOnboarded: true }, // Only include users who have completed onboarding
                { _id: { $nin: currentUser.friends } } // Exclude users who are already friends
            ]
        })
        res.status(200).json({
            recommendedUsers
        })
    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select('friends').populate('friends','fullName profilePic nativeLanguage learningLanguage'); // Populate friends field with user data
        res.status(200).json({
            friends: user.friends
        });
    } catch (error) {
        console.error("Error fetching friends:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
        
    }
    
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id; // Get the current user's ID from the request object
        const {id: recipientId} = req.params; // Get the friend's ID from the request parameters

        // prevent sending friend request to self
        if (myId === recipientId) {
            return res.status(400).json({
                message: "You cannot send a friend request to yourself"
            });
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({
                message: "Recipient not found"
            });
        }
        // Check if the recipient is already a friend
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({
                message: "You are already friends with this user"
            });
        }

        // check if the friend request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });
        if (existingRequest) {
            return res.status(400).json({
                message: "Friend request already exists"
            });
        }

        // Create a new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });
        res.status(201).json({
            message: "Friend request sent successfully",
            friendRequest
        });
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const {id: requestId} = req.params; // Get the friend request ID from the request parameters
        const friendRequest = await FriendRequest.findById(requestId); 
        if (!friendRequest) {
            return res.status(404).json({
                message: "Friend request not found"
            });
        }
        // Check if the current user is the recipient of the friend request
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to accept this friend request"
            });
        }

        // Update the friend request status to accepted
        friendRequest.status = "accepted";
        await friendRequest.save();

        // Add the sender to the recipient's friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });
        // Add the recipient to the sender's friends list
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });
        res.status(200).json({
            message: "Friend request accepted successfully",
        });

    } catch (error) {
        console.error("Error accepting friend request:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
        
    }
}

export async function getFriendRequests(req, res) {
    try {
        const incomingRequests = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate('sender', 'fullName profilePic nativeLanguage learningLanguage'); // Populate sender field with user data

        const acceptedRequests = await FriendRequest.find({
            recipient: req.user.id,
            status: "accepted"
        }).populate('sender', 'fullName profilePic'); // Populate sender field with user data

        res.status(200).json({
            incomingRequests,
            acceptedRequests
        });
    } catch (error) {
        console.error("Error fetching friend requests:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate('recipient', 'fullName profilePic nativeLanguage learningLanguage'); // Populate recipient field with user data

        res.status(200).json({
            outgoingRequests
        });
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
        
    }
}