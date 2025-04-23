const mongoose = require("mongoose")
// const Schema = mongoose.Schema
const costSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description:{
        type:mongoose.Schema.Types.String,
    },
    cost: {
        type: mongoose.Schema.Types.Double,
        required: true,

    },
    score: {
        type: mongoose.Schema.Types.Int32,
        required: true

    },
    category: {
        type:String,
        required:true,
        enum: ["numsOfParticipants","typesOfQuestions","extrasOfQuestions"],

    }
}, { timestamps: true })
module.exports = mongoose.model("Cost", costSchema)