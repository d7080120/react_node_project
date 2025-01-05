const mongoose = require('mongoose')
const panelSchema = new mongoose.Schema({
    customer: {
        type: mongoose.ObjectId, ref: 'Customer',
        required
    },
    questions: {
        type: [{
            title: { type: String, required },
            questionType: { enum: ["text", "check1", "checkMore", "range"] },
            cotents: { type: String, required },
            answers: [string],
            userAnswers: [
                {
                    answer: int,
                    body: string,
                    participant: { type: mongoose.ObjectId, ref: 'Participant' }
                }
            ],
            cost: {
                type: mongoose.Schema.Types.Double
            },
            score: {
                type: int
            },
            analysis_question: {
                type: mongoose.ObjectId, ref: 'Analysis_question',
            },
            extra: [{ enum: ["must", "withOpenText", "image"] }],
        }
        ]
    },
    cost: {
        type: mongoose.Schema.Types.Double
    },
    score: {
        type: int
    },
    numsOfParticipants: {
        type: int,
        default: 1000
    },
    analysis_panel: {
        type: mongoose.ObjectId, ref: 'Analysis_panel',

    },
    Constraints: {
        type: [{
            enum: ["age", "gender", "location"],
            body: { type: String, required },
        }]
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Panel', photoSchema)