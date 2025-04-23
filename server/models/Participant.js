const mongoose = require('mongoose')
const participantSchema = new mongoose.Schema({
    gender: {
        type:String,
         enum: ["Female", "Male"] ,
        requierd:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    phone: {
        type: String,
        required: true,
    },
    dateOfBirth:{
type:mongoose.Schema.Types.Date,
required:true
    } ,
    address: {
        // country: {
        //     type: String,
        //     required: true,
        // },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            // required: true,
        },
        // build: {
        //     type: mongoose.Schema.Types.Int32,
        //     required: true,
        // },
        // apartment: {
        //     type: mongoose.Schema.Types.Int32,
        //     required: true,
        // }
    },
   score : mongoose.Schema.Types.Int32
}, {
    timestamps: true
})
module.exports = mongoose.model('Participant', participantSchema)