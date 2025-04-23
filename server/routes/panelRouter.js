
const express = require("express")
const router = express.Router()
const customerMW = require("../middleware/customerMW")
const masterMW = require("../middleware/masterMW")
const participantMW = require("../middleware/participantMW")

const panelConroller=require("../controllers/panelController")
router.get("/",participantMW,panelConroller.getAllPanels)
router.get("/",panelConroller.getAllPanels)
router.put("/addAnswers",participantMW,panelConroller.addAnswer)

router.use(customerMW)

router.post("/", panelConroller.createPanel)
router.get("/:_id",panelConroller.getPanelById)
router.get("/customer/:_id",panelConroller.getAllPanelsByCustomer)
router.put("/",panelConroller.updatePanel)
router.delete("/_id",panelConroller.deletePanel)

module.exports = router