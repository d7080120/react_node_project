const Constraint = require("../models/Constraint");

const createConstraint = async (req, res) => {
    const { name} = req.body
    if (!name) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const newConstraint = await Constraint.create({ name })
    if (newConstraint) {
        return res.status(201).json({ message: 'New constraint created',
         })
    } else {
        return res.status(400).json({ message: 'Invalid constraint ' })
    }
}

const getAllConstraints = async (req,res) => {
    const constraints=await Constraint.find().lean()
    if(!constraints?.length){
        return res.status(400).json({message: 'No constraints found'})
    }
    res.json(constraints)
}

const getConstraintById = async (req, res) => {
    const {_id} = req.params
    const constraint = await Constraint.findById(_id).lean()
    if (!constraint) {
    return res.status(400).json({ message: 'No constraints found' })
    }
    res.json(constraint)
    }

const updateConstraint=async (req,res)=>{
    const {name }=req.body
    if(!name){
        return res.status(400).json({ message: "fields are required" })
    }
    const newConstraint= await Constraint.findById(_id).exec()
    if(!constraint){
        return res.status(400).json({ message: 'constraint not found' })
    }
    constraint.name=name

    const updatedConstraint=await constraint.save()

    res.json(`${updatedConstraint.name} updated`)
}

const deleteConstraint=async (req,res)=>{
    const {_id}=req.body

    if(!_id){
        return res.status(400).json({ message: "id is required" })
    }
    const constraint = await Constraint.findById(_id).exec()
    if(!constraint){
        return res.status(400).json({ message: 'Constraint not found' })
    }

    await constraint.deleteOne()

    res.send(`constraint ${constraint.name} id ${constraint._id} deleted`)
}
module.exports = {
    createConstraint,
    getAllConstraints,
    getConstraintById,
    updateConstraint,
    deleteConstraint
}
    