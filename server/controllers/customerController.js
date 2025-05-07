const Customer = require("../models/Customer");
const User = require("../models/User");
const Participant = require("../models/Participant");
const bcrypt = require('bcrypt')
const getAllCustomers = async (req, res) => {
    const customers = await Customer.find().lean()
    if (!customers?.length) {
        return res.status(400).json({ message: 'No customers found' })
    }
    res.json(customers)
}
const getCustomerById = async (req, res) => {
    const { _id } = req.params
    const customer = await Customer.findById(_id).lean()
    if (!customer) {
        return res.status(400).json({ message: 'No customers found' })
    }
    res.json(customer)
}
const updateCustomer = async (req, res) => {
    const { _id, username, name, email, password, roles, active } = req.user
    const { phone, panels, country, city, street, build, apartment, date, gender } = req.body
    if (!_id || !username || !password || !name || !email) {
        return res.status(400).json({ message: "fields are required" })
    }
    const duplicate = await Customer.findOne({ username: username }).lean()
    if (duplicate && duplicate._id != _id) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const customer = await Customer.findById(_id).exec()
    if (!customer) {
        return res.status(400).json({ message: 'customer not found' })
    }
    const customerUser = await User.findById(customer.user).exec()
    if (!customerUser) {
        return res.status(400).json({ message: 'customerUser not found' })
    }
    console.log(customerUser.roles);
    if (roles.find(r => r === "Participant" && (!customerUser.roles.find(r => r === "Participant")))) {
        console.log("ooo");
        if (!phone || !country || !city || !street || !build || !apartment || !date || !gender) {// Confirm data
            return res.status(400).json({ message: 'All fields are required' })
        }
        const address = {
            build, street, city, country, apartment
        }
        let dateOfBirth=null;
        dateOfBirth = new Date(date);
        if (!(dateOfBirth instanceof Date) || isNaN(dateOfBirth.getTime())) {
            return res.status(400).json({ message: 'Invalid user received' })
        }
        const participantObject = { user: customer.user, phone, address, dateOfBirth, score: 0, gender }
        const participant = await Participant.create(participantObject)
        if (!participant)
            return res.status(400).json({ message: 'Invalid participant ' })
    }
    customerUser.username = username
    customerUser.email = email
    customerUser.active = active
    customerUser.roles = [...roles]
    const hashedPwd = await bcrypt.hash(password, 10)
    customerUser.password = hashedPwd
    customer.phone = phone
    customer.panels = [...panels]
    customerUser.name = name
    const updatedCustomerUser = await customerUser.save()
    const updatedCustomer = await customer.save()

    const customers = await Customer.find().lean()
    res.json({
        message: `${updatedCustomerUser.username} updated`,
        customers
    })
}
const deleteCustomer = async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        return res.status(400).json({ message: "id is required" })
    }
    const customer = await Customer.findById(_id).exec()
    if (!customer) {
        return res.status(400).json({ message: 'Customer not found' })
    }
    const customerUser = await User.findById(customer.user._id).exec()
    if (customerUser.roles.length === 1) {
        await customerUser.deleteOne()
    }
    else {
        customerUser.roles = customerUser.roles.filter(role => role != "Customer")
    }
    const updatedCustomerUser = await customerUser.save()
    await customer.deleteOne()
    const customers = await Customer.find().lean()
    res.json({
        message: `customer ${customer.username} id ${customer._id} deleted`,
        customers
    })
}
module.exports = {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
