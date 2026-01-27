import mongoose from 'mongoose';
// const { Schema } = mongoose;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,   
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true });

// module.exports = {
//     User: mongoose.model('User', UserSchema),
//     }

export default mongoose.model('User', UserSchema);