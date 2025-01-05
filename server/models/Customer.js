const mongoose = require("mongoose")
const Schema = mongoose.Schema
const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required
    },
    phone: {
        type: String,
        required
    },
    panels:{
        type: [{type:mongoose.ObjectId, ref: 'Panel'}]
    }
}, { timestamps: true })
module.exports = mongoose.model("Customer", customerSchema)