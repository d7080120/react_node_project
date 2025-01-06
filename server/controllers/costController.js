const Cost = require("../models/Cost");

const createCost = async (req, res) => {
    const { name, description, cost, score,category } = req.body
    if (!cost||!name||!score||!category) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const ifName=await Cost.find({name:name})
    if (ifName)
        return res.status(400).json({ message: 'name already exist' })

    const newCost = await Cost.create({ name, description, cost, score,category })
    const costs = await Cost.find().lean()
    if (newCost) { // Created
        return res.status(201).json({ message: 'New cost created',
            costs:costs
         })
    } else {
        return res.status(400).json({ message: 'Invalid cost ' })
    }
}

const getAllCosts = async (req,res) => {
    const costs=await Cost.find().lean()
    if(!costs?.length){
        return res.status(400).json({message: 'No costs found'})
    }
    res.json(costs)
}

const getCostById = async (req, res) => {
    const {id} = req.params
    const cost = await Cost.findById(id).lean()
    if (!cost) {
    return res.status(400).json({ message: 'No costs found' })
    }
    res.json(cost)
    }

const updateCost=async (req,res)=>{
    const {name, description, cost, score,category }=req.name
    if(!cost||!name||!score||!category){
        return res.status(400).json({ message: "fields are required" })
    }
    const newCost= await Cost.findById(id).exec()
    if(!cost){
        return res.status(400).json({ message: 'cost not found' })
    }
    cost.description=description
    cost.name=name
    cost.cost=cost
    cost.score=score
    cost.category=category


    const updatedCost=await cost.save()

    res.json(`${updatedCost.costname} updated`)
}

const deleteCost=async (req,res)=>{
    const {id}=req.name

    if(!id){
        return res.status(400).json({ message: "id is required" })
    }
    const cost = await Cost.findById(id).exec()
    if(!cost){
        return res.status(400).json({ message: 'Cost not found' })
    }

    await cost.deleteOne()

    res.send(`cost ${cost.costname} id ${cost.id} deleted`)
}
module.exports = {
    createCost,
    getAllCosts,
    getCostById,
    updateCost,
    deleteCost
}
    