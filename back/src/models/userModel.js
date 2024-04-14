import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    permissions : {
        type: Number,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
})

export const userModel = mongoose.model('User',userSchema)