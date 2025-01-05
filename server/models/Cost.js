const mongoose = require("mongoose")
const Schema = mongoose.Schema
const costSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique
    },
    description:{
        type: mongoose.Schema.Types.Int32,
    },
    cost: {
        type: mongoose.Schema.Types.Double,
        required
    },
    score: {
        type: mongoose.Schema.Types.Int32,
        reuiqred

    }
}, { timestamps: true })
module.exports = mongoose.model("Cost", costSchema)