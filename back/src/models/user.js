import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    permissions : {
        type: Number,
        required: true
    }
})

export const User = mongoose.model('user',userSchema)
