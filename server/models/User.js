const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
username:{
type: String,
required: true,
unique: true,
lowercase: true,
trim:true
},
password:{
type:String,
required:true
},
roles:{
type:String,
enum:['Customer','Participant','master'],
default:"Participant",
},
active: {
type: Boolean,
default: true,
},
properties:{
    type: mongoose.ObjectId,
    required

}
},{timestamps:true})
module.exports = mongoose.model("User", userSchema)