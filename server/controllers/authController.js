const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Participant = require("../models/Participant")
const Customer = require("../models/Customer")


const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
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
            phone: foundCustomer.phone,
            panels: [...foundCustomer.panels]
        }
    }
    if (foundUser.roles.find(r => r === "Participant")) {

        const foundParticipant = await Participant.findOne({ user: foundUser._id })
        if (!foundParticipant) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        userInfo.participant = {
            phone: foundParticipant.phone,
            dateOfBirth: { ...foundParticipant.dateOfBirth },
            address: { ...foundParticipant.address },
            score:foundParticipant.score,
            gender:foundParticipant.gender
        }
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })

    res.send("Logged In")

}
const registerParticipant = async (req, res) => {
    const { username, password, name, email, phone, country, city, street, build, apartment, dateOfBirth,gender } = req.body
    if (!name || !username || !password || !email || !phone || !country || !city || !street || !build || !apartment || !dateOfBirth||!gender) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, username, active: true, phone, password: hashedPwd, roles: ["Participant"] }
    const user = await User.create(userObject)

    if (!user) {
        return res.status(400).json({ message: 'Invalid user received' })

    }
    userId = user._id
    const participantObject = { user: userId, phone, address, dateOfBirth, build, street, city, country, apartment, score: 0 ,gender}
    const participant = await User.create(participantObject)
    const participants = await Post.find().lean()
    if (!participant) {
        return res.status(400).json({ message: "Invalid participant received" })
    }

    return res.status(201).json({
        message: `New user type participant ${user.username}created`,
        participants
    })
}
const registerCustomer = async (req, res) => {
    const { username, password, name, email, phone } = req.body
    if (!name || !username || !password || !email) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, username, active: true, phone, password: hashedPwd, roles: ["Customer"] }
    const user = await User.create(userObject)

    if (!user) {
        return res.status(400).json({ message: 'Invalid user received' })

    }
    userId = user._id
    const customerObject = { user: userId, phone }
    const customer = await User.create(customerObject)
    const customers = await Post.find().lean()
    if (!customer) {
        return res.status(400).json({ message: "Invalid customer received" })
    }

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
    const userObject = { name, email, username, active: true, phone, password: hashedPwd, roles: ["Master"] }
    const user = await User.create(userObject)

    if (!user) {
        return res.status(400).json({ message: 'Invalid user received' })

    }
    return res.status(201).json({
        message: `New user type customer ${user.username}created`,
        customers
    })
}
module.exports = { login, registerParticipant, registerCustomer,registerMaster }