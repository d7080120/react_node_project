const DailyLottery = require("../models/DailyLottery");

const createDailyLottery = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ message: 'email is required' })
    }const duplicate = await User.findOne({ email: email }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email" })
    }
    const newDailyLottery = await DailyLottery.create({ email})
    if (newDailyLottery) { 
        return res.status(201).json({ message: 'New dailyLottery created',
         })
    } else {
        return res.status(400).json({ message: 'Invalid dailyLottery ' })
    }
}
const getAllDailyLotterys = async (req, res) => {
    const customers = await DailyLottery.find().lean()
    if (!customers?.length) {
        return res.status(400).json({ message: 'No customers found' })
    }
    res.json(customers)
}

const getDailyLotteryById = async (req, res) => {
    const { _id } = req.params
    const dailyLottery = await DailyLottery.findById(_id).lean()
    if (!dailyLottery) {
        return res.status(400).json({ message: 'No customers found' })
    }
    res.json(dailyLottery)
}

const deleteDailyLottery = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ message: "id is required" })
    }
    const dailyLottery = await DailyLottery.findById(_id).exec()
    if (!dailyLottery) {
        return res.status(400).json({ message: 'DailyLottery not found' })
    }
    const customerUser = await User.findById(dailyLottery.user._id).exec()

    if(customerUser.roles.length===1){
    await customerUser.deleteOne()

    }
    else{
        customerUser.roles=customerUser.roles.filter(role=>role!="DailyLottery")
    }
    await dailyLottery.deleteOne()

    const customers = await DailyLottery.find().lean()
    res.json({
        message: `dailyLottery ${dailyLottery.username} id ${dailyLottery._id} deleted`,
        customers
    })
}
module.exports = {
    getAllDailyLotterys,
    getDailyLotteryById,
    deleteDailyLottery,
    createDailyLottery
}
