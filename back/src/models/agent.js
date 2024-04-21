import mongoose from 'mongoose'

const agentSchema = mongoose.Schema({
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

export const agentModel = mongoose.model('agent',agentSchema)
