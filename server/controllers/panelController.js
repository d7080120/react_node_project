const Panel = require("../models/Panel");
const Cost = require("../models/Cost");
const calculateCostAndScore = async (questions, numsOfParticipants) => {
    const costs = await Cost.find().lean()
    if (!panels?.length) {
        return Error({ message: "No data" })
    }
    let cost = 0
    let score = 0
    const costsNumsOfParticipants = costs.filter(c => c.category === "numsOfParticipants")
    costPerParticipants = costsNumsOfParticipants.find(c => c.name === `${numsOfParticipants}participant`)
    if (costPerParticipants)
        cost += costPerParticipants.cost
    else
        cost += costsNumsOfParticipants.find(c => c.name === "1participant").cost * numsOfParticipants
    const typesOfQuestions=costs.filter(c=>c.category==="typesOfQuestions")
    const extrasOfQuestions=costs.filter(c=>c.category==="extrasOfQuestions")

    questions.forEach(question => {
        questionScore = 0
        questionCost = 0

        questionCost +=typesOfQuestions.find(tq=>tq.name===question.questionType).cost 
        questionScore +=typesOfQuestions.find(tq=>tq.name===question.questionType).score
        question.extra.forEach(e => {
            questionCost +=extrasOfQuestions.find(tq=>tq.name===e).cost 
        questionScore +=extrasOfQuestions.find(tq=>tq.name===e).score
        })
        question.cost=questionCost
        question.score = questionScore
        score += questionScore
        cost+=questionCost
    });
    return { cost, score }

}
const createPanel = async (req, res) => {
    const { customer, questions, numsOfParticipants, constraints, anonyous } = req.body
    if (!customer) {
        return res.status(400).json({ message: 'fildes are required' })
    }

    try {
        const { cost, score } = calculateCostAndScore(questions, numsOfParticipants)
        const panel = await Panel.create({ customer, questions, numsOfParticipants, constraints, anonyous, cost, score })
        const panels = await Panel.find().lean()

        if (panel) {
            return res.status(201).json({
                message: 'New panel created',
                panel: panels
            })
        } else {
            return res.status(400).json({ message: 'Invalid panel' })
        }
    }
    catch (e) {
        res.status(400).json(e)
    }

}

const getAllPanels = async (req, res) => {
    const panels = await Panel.find().lean()
    if (!panels?.length) {
        return res.status(400).json({ message: 'No panels found' })
    }
    res.json(panels)
}

const getPanelById = async (req, res) => {
    const { _id } = req.params
    const panel = await Panel.findById(_id).lean()
    if (!panel) {
        return res.status(400).json({ message: 'No panels found' })
    }
    res.json(panel)
}

const updatePanel = async (req, res) => {
    const { _id, questions, numsOfParticipants, constraints, anonyous } = req.body
    if (!_id) {
        return res.status(400).json({ message: "fileds are required" })
    }
    const panel = await Panel.findById(_id).exec()
    if (!panel) {
        return res.status(400).json({ message: 'panel not found' })
    }
    try {
        const { cost, score } = calculateCostAndScore(questions, numsOfParticipants)
        panel.cost = cost
        panel.score = score
    }
    catch (e) {
        res.status(400).json(e)
    }
    panel.questions =[...questions] ,
    panel.numsOfParticipants = numsOfParticipants,
    panel.constraints = [...constraints],
    panel.anonyous = anonyous
    const updatedPanel = await panel.save()
    const panels = await Panel.find().lean()
    res.json(panels)
}

const deletePanel = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        return res.status(400).json({ message: "_id is required" })
    }
    const panel = await Panel.findById(_id).exec()
    if (!panel) {
        return res.status(400).json({ message: 'Panel not found' })
    }

    await panel.deleteOne()
    const panels = await Panel.find().lean()
    if (!panels?.length) {
        return res.status(400).json({ message: 'No panels found' })
    }
    res.send(`panel ${panel.title} _id ${panel._id} deleted`).json(panels)
}
module.exports = {
    createPanel,
    getAllPanels,
    getPanelById,
    updatePanel,
    deletePanel
}
