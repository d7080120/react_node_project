const Customer = require("../models/Customer");


const getAllCustomers = async (req, res) => {
    const customers = await Customer.find().lean()
    if (!customers?.length) {
        return res.status(400).json({ message: 'No customers found' })
    }
    res.json(customers)
}

const getCustomerById = async (req, res) => {
    const { id } = req.params
    const customer = await Customer.findById(id).lean()
    if (!customer) {
        return res.status(400).json({ message: 'No customers found' })
    }
    res.json(customer)
}

const updateCustomer = async (req, res) => {
    const { id, username, name, email, address, phone, password, roles, active, gender } = req.name
    if (!id || !username || !password || !name) {
        return res.status(400).json({ message: "fields are required" })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const customer = await Customer.findById(id).exec()
    if (!customer) {
        return res.status(400).json({ message: 'customer not found' })
    }
    const customerUser = await User.findById(customer.user._id).exec()
    if (!customerUser) {
        return res.status(400).json({ message: 'customerUser not found' })
    }
    customerUser.username = username
    customerUser.email = email
    customerUser.active = active
    customerUser.roles = [...roles]
    customerUser.password = password
    customer.phone = phone
    customert.roles = [...panels]
    customer.name = name

    const updatedCustomerUser = await customerUser.save()
    const updatedCustomer = await customer.save()

    const customers = await Customer.find().lean()
    res.json({
        message: `${updatedCustomer.username} updated`,
        customers
    })
}

const deleteCustomer = async (req, res) => {
    const { id } = req.name
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    const customer = await Customer.findById(id).exec()
    if (!customer) {
        return res.status(400).json({ message: 'Customer not found' })
    }
    const customerUser = await User.findById(customer.user._id).exec()

    if(customerUser.roles.length===1){
    await customerUser.deleteOne()

    }
    else{
        customerUser.roles=customerUser.roles.filter(role=>role!="Customer")
    }
    await customer.deleteOne()

    const customers = await Customer.find().lean()
    res.json({
        message: `customer ${customer.username} id ${customer.id} deleted`,
        customers
    })
}
module.exports = {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
