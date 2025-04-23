const mongoose = require("mongoose")
const Schema = mongoose.Schema
const dailyLotterySchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required:true,
        unique: true
        }
},{timestamps:true})
module.exports = mongoose.model("DailyLottery", dailyLotterySchema)