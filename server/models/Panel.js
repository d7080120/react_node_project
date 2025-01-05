const mongoose = require('mongoose')
const panelSchema = new mongoose.Schema({
    customer:{
        type: mongoose.ObjectId, ref: 'Customer', 
        required
    },
    questions:{
        type:[{
         
        }
        ]
    },
    cost:{
        type:mongoose.Schema.Types.Double
    },
    score:{
        type:int
    },
    numsOfParticipents:{
        type:int,
        default:1000
    },
    analysis:{
        type: mongoose.ObjectId, ref: 'Analysis', 
        
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Panel', photoSchema)