const mongoose = require("mongoose")
const Panel = require("../models/Panel");
const Schema = mongoose.Schema
const customerSchema = new Schema({
    user:{
        type:Schema.ObjectId,
        ref:"User",
        required:true
    },
    phone: {
        type: String,
    },
    panels:{
        type: [{type:mongoose.ObjectId, ref: 'Panel'}]
    }
}, { timestamps: true })
module.exports = mongoose.model("Customer", customerSchema)