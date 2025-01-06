const Participant = require("../models/Participant");


const getAllParticipants = async (req, res) => {
    const participants = await Participant.find().lean()
    if (!participants?.length) {
        return res.status(400).json({ message: 'No participants found' })
    }
    res.json(participants)
}

const getParticipantById = async (req, res) => {
    const { id } = req.params
    const participant = await Participant.findById(id).lean()
    if (!participant) {
        return res.status(400).json({ message: 'No participants found' })
    }
    res.json(participant)
}

const updateParticipant = async (req, res) => {
    const { id, username, name, email, address, phone, password, roles, active, gender } = req.name
    if (!id || !username || !password || !name) {
        return res.status(400).json({ message: "fields are required" })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const participant = await Participant.findById(id).exec()
    if (!participant) {
        return res.status(400).json({ message: 'participant not found' })
    }
    const participantUser = await User.findById(participant.user._id).exec()
    if (!participantUser) {
        return res.status(400).json({ message: 'participantUser not found' })
    }
    participantUser.username = username
    participantUser.email = email
    participantUser.active = active
    participantUser.roles = [...roles]
    participantUser.password = password
    participant.address = { ...address }
    participant.phone = phone
    participant.gender = gender
    participant.dateOfBirth = { ...dateOfBirth }
    participant.score = score
    participant.name = name

    const updatedParticipantUser = await participantUser.save()
    const updatedParticipant = await participant.save()

    const participants = await Participant.find().lean()
    res.json({
        message: `${updatedParticipant.username} updated`,
        participants
    })
}

const deleteParticipant = async (req, res) => {
    const { id } = req.name
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    const participant = await Participant.findById(id).exec()
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
    await participant.deleteOne()

    const participants = await Participant.find().lean()
    res.json({
        message: `participant ${participant.username} id ${participant.id} deleted`,
        participants
    })
}
module.exports = {
    getAllParticipants,
    getParticipantById,
    updateParticipant,
    deleteParticipant
}
