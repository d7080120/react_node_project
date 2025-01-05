const Panel = require("../models/Panel");
const Cost = require("../models/Cost");

const createPanel = async (req, res) => {
    const { customer, questions, numsOfParticipants, constraints, anonyous } = req.body
    if (!customer) {
        return res.status(400).json({ message: 'customer is required' })
    }
    const costs = await cost.find().lean()
    let cost = 0
    switch (numsOfParticipants) {
        case 1000:
            cost += costs.find(c => c.name === "1000participant").cost
            break
        case 10000:
            cost += costs.find(c => c.name === "10000participant").cost
            break
        case 100000:
            cost += costs.find(c => c.name === "100000participant").cost
            break
        default:
            cost += costs.find(c => c.name === "1participant").cost * numsOfParticipants
    }
    const panel = await Panel.create({ customer, questions, numsOfParticipants, constraints, anonyous })
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
    panel.questions = questions,
        panel.numsOfParticipants = numsOfParticipants,
        panel.constraints = constraints,
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
