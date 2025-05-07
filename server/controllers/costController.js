const Cost = require("../models/Cost");
const createCost = async (req, res) => {
    const { name, description, cost, score,category } = req.body
    if (!cost||!name||!score||!category) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const ifName=await Cost.findOne({name:name})
    if (ifName)
        return res.status(400).json({ message: 'name already exist' })
    const newCost = await Cost.create({ name, description, cost, score,category })
    const costs = await Cost.find().lean()
    if (newCost) {
        return res.status(201).json({ message: 'New cost created',
            costs:costs
         })
    } else {
        return res.status(400).json({ message: 'Invalid cost ' })
    }
}
const getAllCosts = async (req,res) => {
    console.log(req.user)
    const costs=await Cost.find().lean()
    if(!costs?.length){
        return res.status(400).json({message: 'No costs found'})
    }
    res.json(costs)
}
const getCostById = async (req, res) => {
    const {_id} = req.params
    const cost = await Cost.findById(_id).lean()
    if (!cost) {
    return res.status(400).json({ message: 'No costs found' })
    }
    res.json(cost)
    }
const updateCost=async (req,res)=>{
    const {name, description, cost, score,category }=req.body
    if(!cost||!name||!score||!category){
        return res.status(400).json({ message: "fields are required" })
    }
    const duplicate = await Customer.findOne({ name: name }).lean()
    if (duplicate&&duplicate._id!=_id) {
        return res.status(409).json({ message: "Duplicate name" })
    }
    const newCost= await Cost.findById(_id).exec()
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
    const {_id}=req.body

    if(!_id){
        return res.status(400).json({ message: "id is required" })
    }
    const cost = await Cost.findById(_id).exec()
    if(!cost){
        return res.status(400).json({ message: 'Cost not found' })
    }

    await cost.deleteOne()

    res.send(`cost ${cost.costname} id ${cost._id} deleted`)
}
module.exports = {
    createCost,
    getAllCosts,
    getCostById,
    updateCost,
    deleteCost
}
    