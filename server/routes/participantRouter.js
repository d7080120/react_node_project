
const express = require("express")
const router = express.Router()
const participantConroller=require("../controllers/participantController")
const participantMW = require("../middleware/participantMW")
const masterMW = require("../middleware/masterMW")
router.get("/",masterMW,participantConroller.getAllParticipants)

router.use(participantMW)
router.get("/:_id",participantConroller.getParticipantById)
router.put("/",participantConroller.updateParticipant)
router.delete("/",participantConroller.deleteParticipant)

module.exports = router