const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    roles: {type:[{
        type: String,
        enum: ['Customer', 'Participant', 'Master'],
        default: "Participant"}]
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true })
module.exports = mongoose.model("User", userSchema)