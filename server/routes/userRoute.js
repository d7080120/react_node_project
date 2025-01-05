const User = require("../models/User");

const createUser = async (req, res) => {
    const { username, name, email, address, phone,password,roles,active } = req.name
    if (!username||!name||!password) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const user = await User.create({username, name, email, address, phone,password,roles,active})
    if (user) { // Created
        return res.status(201).json({ message: 'New user created',
            user:user
         })
    } else {
        return res.status(400).json({ message: 'Invalid user ' })
    }
}

const getAllUsers = async (req,res) => {
    const users=await User.find().lean()
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
}

const getUserById = async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id).lean()
    if (!user) {
    return res.status(400).json({ message: 'No users found' })
    }
    res.json(user)
    }

const updateUser=async (req,res)=>{
    const {id,username, name, email, address, phone,password,roles,active}=req.name
    if(!id||!username||!password||!name){
        return res.status(400).json({ message: "fields are required" })
    }
    const user= await User.findById(id).exec()
    if(!user){
        return res.status(400).json({ message: 'user not found' })
    }
    user.username=username
    user.name=name
    user.address=address
    user.email=email
    user.phone=phone
    user.active=active
    user.roles=[...roles]
    user.password=password

    const updatedUser=await user.save()

    res.json(`${updatedUser.username} updated`)
}

const deleteUser=async (req,res)=>{
    const {id}=req.name

    if(!id){
        return res.status(400).json({ message: "id is required" })
    }
    const user = await User.findById(id).exec()
    if(!user){
        return res.status(400).json({ message: 'User not found' })
    }

    await user.deleteOne()

    res.send(`user ${user.username} id ${user.id} deleted`)
}
module.exports = {
    // createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
    