const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Participant = require("../models/Participant")
const Customer = require("../models/Customer")
const Panel = require("../models/Panel")


const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    console.log(username)
    const foundUser = await User.findOne({ username }).lean()

    if (!foundUser || !foundUser.active) {

        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const userInfo = {
        _id: foundUser._id, name: foundUser.name,
        roles: foundUser.roles, username: foundUser.username,
        email: foundUser.email
    }
    if (foundUser.roles.find(r => r === "Customer")) {

        const foundCustomer = await Customer.findOne({ user: foundUser._id })
        if (!foundCustomer) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        userInfo.customer = {
            _id:foundCustomer._id,
            phone: foundCustomer.phone,
            panels: [...foundCustomer.panels],
            
        }
    }
    if (foundUser.roles.find(r => r === "Participant")) {
        const foundParticipant = await Participant.findOne({ user: foundUser._id })
        if (!foundParticipant) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        userInfo.participant = {
            _id:foundParticipant._id,
            phone: foundParticipant.phone,
            dateOfBirth: foundParticipant.dateOfBirth ,
            address: { ...foundParticipant.address },
            score: foundParticipant.score,
            gender: foundParticipant.gender
        }
      }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken ,userInfo:userInfo})

}
const registerParticipant = async (req, res) => {
    const { username, password, name, email, phone,  city,address, date, gender } = req.body
    // if (!name || !username || !password || !email || !phone || !country || !city || !street || !build || !apartment || !date || !gender) {// Confirm data
    if (!name || !username || !password || !email || !phone ||  !city || !date || !gender) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, username, active: true, password: hashedPwd, roles: ["Participant"] }

    const user = await User.create(userObject)

    if (!user) {
        return res.status(400).json({ message: 'Invalid user received' })
    }
    userId = user._id
    const fulladdress = {
        // build, street,
         city, 
         address
        //  country, apartment
    }

    const dateOfBirth = new Date(date)
    const participantObject = { user: userId, phone, address:fulladdress, dateOfBirth, score: 0, gender }
    const participant = await Participant.create(participantObject)
    if (!participant) {
        console.log(user.roles.length)
        if (user.roles.length === 1) {
            await user.deleteOne()
        }
        return res.status(400).json({ message: "Invalid participant received" })
    }
    const participants = await Participant.find().lean()
    return res.status(201).json({
        message: `New user type participant ${user.username}created`,
        participants
    })
}
const registerCustomer = async (req, res) => {
    const { username, password, name, email, phone } = req.body
    if (!name || !username || !password || !email) {// Confirm data
        return res.status(401).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, username, active: true, password: hashedPwd, roles: ["Customer"] }
    const user = await User.create(userObject)
    if (!user) {
        return res.status(400).json({ message: 'Invalid user received' })
    }
    userId = user._id
    const panels = []
    const customerObject = { user: userId, phone, panels }
    const customer = await Customer.create(customerObject)
    if (!customer) {
        if (user.roles.length === 1) {
            await user.deleteOne()
        }
        return res.status(400).json({ message: "Invalid customer received" })
    }
    const customers = await Customer.find().lean()
    return res.status(201).json({
        message: `New user type customer ${user.username}created`,
        customers
    })
}
const registerMaster = async (req, res) => {
    const { username, password, name, email } = req.body
    if (!name || !username || !password || !email) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, username, active: true, password: hashedPwd, roles: ["Master"] }
    const user = await User.create(userObject)
    if (!user) {
        return res.status(400).json({ message: 'Invalid user received' })

    }
    return res.status(201).json({
        message: `New user type customer ${user.username}created`,
        user
    })
}
module.exports = { login, registerParticipant, registerCustomer, registerMaster }