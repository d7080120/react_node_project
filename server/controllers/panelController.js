const Panel = require("../models/Panel");
const Cost = require("../models/Cost");
const calculateCostAndScore = async (questions, numsOfParticipants) => {
    const costs = await Cost.find().lean()
    if (!costs?.length) {
        return Error({ message: "No costs data" })
    }
    let cost = 0
    let score = 0
    const typesOfQuestions = costs.filter(c => c.category === "typesOfQuestions")
    const extrasOfQuestions = costs.filter(c => c.category === "extrasOfQuestions")

    questions.forEach(question => {
        let questionScore = 0
        let questionCost = 0
        questionCost += typesOfQuestions.find(tq => String(tq._id) === question.questionType).cost
        questionScore += typesOfQuestions.find(tq =>  String(tq._id)  === question.questionType).score

        question.extra.forEach(e => {
            questionCost += extrasOfQuestions.find(tq =>  String(tq._id)  === e).cost
            questionScore += extrasOfQuestions.find(tq =>  String(tq._id)  === e).score
        })
        question.cost = questionCost
        question.score = questionScore
        score += questionScore
        cost += questionCost
    });

    const costsNumsOfParticipants = costs.filter(c => c.category === "numsOfParticipants")
    costPerParticipants = costsNumsOfParticipants.find(c => c.name === `${numsOfParticipants}Participants`)
    if (costPerParticipants)
        cost *= costPerParticipants.cost
    else
        cost *= costsNumsOfParticipants.find(c => c.name === "1Participants").cost * numsOfParticipants

    const ansObj = { cost, score }

    return ansObj

}
const createPanel = async (req, res) => {
    const { customer, questions, numsOfParticipants, constraints, name, description,enable } = req.body
    if (!customer || !name) {
        return res.status(400).json({ message: 'fildes are required' })
    }

    try {
        console.log("p");

        // const { cost, score } = await calculateCostAndScore(questions, numsOfParticipants)
        const cost = numsOfParticipants*questions.length*0.2
        const score = questions.length*3
        console.log(constraints);
        const panel = await Panel.create({ customer, questions, numsOfParticipants, constraints, cost, score, name, description ,enable })
        console.log("p2");

        const panels = await Panel.find().lean()
        console.log("p3");

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
        console.log(e.message);
        res.status(400).json({ "error": e.message })
    }

}

const getAllPanels = async (req, res) => {
    const panels = await Panel.find().lean()
    if (!panels?.length) {
        return res.status(400).json({ message: 'No panels found' })
    }
    res.json(panels)
}
const addAnswer=async (req,res)=>{
    const {panel_id,answers,participant}=req.body
    if (!panel_id || !answers ||!participant) {
        return res.status(400).json({ message: 'fildes are required' })
    }
    const panel= await Panel.findById(panel_id).exec()
    if (!panel) {
        return res.status(400).json({ message: 'No panels found' })
    }
    questions=panel.questions
    console.log(answers);

    answers.forEach(ans => {

       const quest=questions.find((q)=>{ return q._id.toString()===ans.question_id})
        quest.userAnswers.push({body:ans.answer,participant})
    });
    panel.questions = [...questions]
    console.log(typeof panel);
    const updatedPanel = await panel.save()
    res.json(answers)
}
const getAllPanelsByCustomer = async (req, res) => {
    const {_id}=req.params
    const panels = await Panel.find({customer:_id}).lean()
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
    const { _id, questions, numsOfParticipants, constraints, name, description,enable } = req.body
    if (!_id || !name) {
        return res.status(400).json({ message: "fileds are required" })
    }
    const panel = await Panel.findById(_id).exec()
    if (!panel) {
        return res.status(400).json({ message: 'panel not found' })
    }
    try {
        // const { cost, score } = calculateCostAndScore(questions, numsOfParticipants)
        // panel.cost = cost
        // panel.score = score
        panel.cost = numsOfParticipants*questions.length*0.2
        panel.score = questions.length*3
    }
    catch (e) {
        res.status(400).json(e)
    }
    panel.questions = [...questions]
    panel.numsOfParticipants = numsOfParticipants
    panel.constraints = [...constraints]
    panel.name = name
    panel.description = description
    panel.enable=enable
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
    deletePanel,
    getAllPanelsByCustomer,
    addAnswer
}
