const participantMW = (req, res, next) => {
    const role=req.user.roles.find(r=>r==="Participant"||r==="Master")
    if(!role){
        return res.status(401).json({ message: 'participant Unauthorized' })
    }
    next()
}
module.exports = participantMW