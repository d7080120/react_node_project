const customerMW = (req, res, next) => {
    const role=req.user.roles.find(r=>r==="Customer"||r==="Master")
    if(!role){
        return res.status(401).json({ message: 'customer Unauthorized' })
    }

    next()
}
module.exports = customerMW