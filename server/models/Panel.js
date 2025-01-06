const mongoose = require('mongoose')
// const Cost = require("../models/Cost");
// const Cost = require("../models/Customer");
// const Cost = require("../models/Participant");
// const Cost = require("../models/Constraint");
// const Cost = require("../models/Analysis_question");


const panelSchema = new mongoose.Schema({
    customer: {
        type: mongoose.ObjectId, ref: 'Customer',
        immutable:true,
        required:true
    },
    questions: {
        type: [{
            title: { type: String, required:true },
            questionType: { String},
            cotents: { type: String, required:true },
            answers: [String],
            userAnswers: [
                {
                    answer: mongoose.Schema.Types.Int32,
                    body: String,
                    participant: { type: mongoose.ObjectId, ref: 'Participant' }
                }
            ],
            cost: {
                type: mongoose.Schema.Types.Double
            },
            score: {
                type:  mongoose.Schema.Types.Int32
            },
            analysis_question: {
                type: mongoose.ObjectId, ref: 'Analysis_question',
            },
            extra: [String],
        }
        ]
    },
    cost: {
        type: mongoose.Schema.Types.Double
    },
    score: {
        type:  mongoose.Schema.Types.Int32
    },
    numsOfParticipants: {
        type:  mongoose.Schema.Types.Int32,
        default: 1000
    },
    analysis_panel: {
        type: mongoose.ObjectId, ref: 'Analysis_panel',

    },
    constraints: {
        type: [{
            type: { type: mongoose.ObjectId, ref: 'Constraint'},
            body: { type: String, required:true},
        }]
    },
    anonyous:Boolean
}, {
    timestamps: true
})
module.exports = mongoose.model('Panel', panelSchema)