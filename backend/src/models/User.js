import bcrypt from 'bcryptjs'; // library for hashing passwords
import mongoose from 'mongoose'; // MongoDB object modeling tool

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // ensure email is unique
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // enforce minimum password length
    },
    bio: {
        type: String,
        default: '', // default value for bio
    },
    profilePic: {
        type: String,
        default: '', // default value for profile picture
    },
    nativeLanguage: {
        type: String,
        default: '', // default value for native language
    },
    learningLanguage: {
        type: String,
        default: '', // default value for learning language
    },
    location: {
        type: String,
        default: '', // default value for location
    },
    isOnboarded: {
        type: Boolean,
        default: false, // default value for onboarding status
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to User model for friends
    }],

},{timestamps: true}); // create timestamps for createdAt and updatedAt

userSchema.pre('save', async function(next) { //! Important

    if (!this.isModified('password')) return next(); // skip hashing if password is not modified and this is a important task to avoid unnecessary hashing


    try { // Important to learn hashing before save 
        const salt = await bcrypt.genSalt(10); // generate salt for hashing
        this.password = await bcrypt.hash(this.password, salt); // hash the password
        next(); // proceed to save the user
    } catch (error) {
        next(error); // pass error to next middleware
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    const isPasswordCorrect =  await bcrypt.compare(enteredPassword, this.password); // compare entered password with hashed password
    return isPasswordCorrect; // return true if passwords match, false otherwise

}

const User = mongoose.model('User', userSchema); // create User model from schema

// Pre hook to hash password before saving


export default User; // export User model for use in other parts of the application