const mongoose = require("mongoose")
const Schema = mongoose.Schema
const constraintSchema = new Schema({
    name: {
        type: String,
        required
    }
},{timestamps:true})
module.exports = mongoose.model("Constraint", constraintSchema)