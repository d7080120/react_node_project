const mongoose = require('mongoose')
const participantSchema = new mongoose.Schema({
    gender:{enum:["female","male"]},
    name:{
    type:String,
    required:true,
    },
    email: {
    type: String,
    lowercase: true,
    trim:true,
    required:true,
    },
    phone: {
    type: String,
    required:true,
    },
    dateOfBirth:mongoose.Schema.Types.Date,
    address:{
        country:{
            type: String,
            required:true,
            },
        city:{
            type: String,
            required:true,
            },
        street:{
            type: String,
            required:true,
            },
        build:{
            type: int,
            required:true,
            },
        floor:{
            type: int,
            required:true,
            }
    },
    score:int
}, {
    timestamps: true
})
module.exports = mongoose.model('Participant', participantSchema)