const Participant = require("../models/Participant");
const User = require("../models/User");
const Customer = require("../models/Customer");
const bcrypt = require('bcrypt')


const getAllParticipants = async (req, res) => {
    const participants = await Participant.find().lean()
    if (!participants?.length) {
        return res.status(400).json({ message: 'No participants found' })
    }
    res.json(participants)
}

const getParticipantById = async (req, res) => {
    const { _id } = req.body
    const participant = await Participant.findById(_id).lean()
    if (!participant) {
        return res.status(400).json({ message: 'No participants found' })
    }
    res.json(participant)
}

const updateParticipant = async (req, res) => {

    const{ username, name, email, roles}=req.user
    const { address, phone,  gender ,_id} = req.body
    let {score,date}=req.body
    const active=true;
    score=parseInt(score, 10)
    date=new Date(date)
    console.log(date);
    if (!_id || !username  || !name) {
        return res.status(400).json({ message: "fields are required" })
    }
    const duplicate = await Participant.findOne({ username: username }).lean()
    if (duplicate&&duplicate._id!=_id) {
        return res.status(409).json({ message: `${duplicate._id} Duplicate username` })
    }
    const participant = await Participant.findById(_id).exec()
    if (!participant) {
        return res.status(400).json({ message: 'participant not found' })
    }
    console.log("oooooo");
    const participantUser = await User.findById(participant.user).exec()
    if (!participantUser) {
        return res.status(400).json({ message: 'participantUser not found' })
    }
    console.log(participantUser);
    if (roles.find(r=>r==="Customer")&&(!participantUser.roles.find(r=>r==="Customer"))){
        const customerObject = { user: participant.user, phone, panels:[] }
        const customer = await Customer.create(customerObject)
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer' })

        }
    }
        
    
    participantUser.username = username
    participantUser.email = email
    participantUser.active = active
    participantUser.roles = [...roles]
    participant.address = { ...address }
    participant.phone = phone
    participant.gender = gender
    participant.dateOfBirth  = new Date(date)
    participant.score = score
    participantUser.name = name

    const updatedParticipantUser = await participantUser.save()
    const updatedParticipant = await participant.save()

    const participants = await Participant.find().lean()
    res.json({
        message: `${updatedParticipantUser.username} updated`,
        participants
    })

}
// const updateParticipantPassword = async (req, res) => {
//     console.log(req.user)
//     const{ _id, username, name, email,password, roles, active}=req.user
//     const { address, phone,  gender ,date,score} = req.body
    
//     if (!_id || !username || !password || !name) {
//         return res.status(400).json({ message: "fields are required" })
//     }
//     const duplicate = await Participant.findOne({ username: username }).lean()
//     if (duplicate&&duplicate._id!=_id) {
//         return res.status(409).json({ message: `${duplicate._id} Duplicate username` })
//     }
//     const participant = await Participant.findById(_id).exec()
//     if (!participant) {
//         return res.status(400).json({ message: 'participant not found' })
//     }
//     console.log("oooooo");
//     const participantUser = await User.findById(participant.user).exec()
//     if (!participantUser) {
//         return res.status(400).json({ message: 'participantUser not found' })
//     }
//     console.log(participantUser);
//     if (roles.find(r=>r==="Customer")&&(!participantUser.roles.find(r=>r==="Customer"))){
//         const customerObject = { user: participant.user, phone, panels:[] }
//         const customer = await Customer.create(customerObject)
//         if (!customer) {
//             return res.status(400).json({ message: 'Invalid customer' })

//             // if (user.roles.length === 1) {
//             //     await user.deleteOne()
//             // }
//             // return res.status(400).json({ message: "Invalid customer received" })
//         }
//     }
        
    
//     participantUser.username = username
//     participantUser.email = email
//     participantUser.active = active
//     participantUser.roles = [...roles]
//     const hashedPwd = await bcrypt.hash(password, 10)
//     participantUser.password = hashedPwd
//     participant.address = { ...address }
//     participant.phone = phone
//     participant.gender = gender
//     participant.dateOfBirth  = new Date(date)
//     participant.score = score
//     participantUser.name = name

//     const updatedParticipantUser = await participantUser.save()
//     const updatedParticipant = await participant.save()

//     const participants = await Participant.find().lean()
//     res.json({
//         message: `${updatedParticipantUser.username} updated`,
//         participants
//     })

// }
const deleteParticipant = async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        return res.status(400).json({ message: "id is required" })
    }
    const participant = await Participant.findById(_id).exec()
    if (!participant) {
        return res.status(400).json({ message: 'Participant not found' })
    }
    const participantUser = await User.findById(participant.user._id).exec()

    if(participantUser.roles.length===1){
    await participantUser.deleteOne()

    }
    else{
        participantUser.roles=participantUser.roles.filter(role=>role!="Participant")
    }
    const updatedParticipantUser = await participantUser.save()

    await participant.deleteOne()

    const participants = await Participant.find().lean()
    res.json({
        message: `participant ${participant.username} id ${participant._id} deleted`,
        participants
    })
}

module.exports = {
    getAllParticipants,
    getParticipantById,
    updateParticipant,
    deleteParticipant
}
