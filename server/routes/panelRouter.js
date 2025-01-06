
const express = require("express")
const router = express.Router()

const panelConroller=require("../controllers/panelController")

router.post("/", panelConroller.createPanel)
router.get("/",panelConroller.getAllPanels)
router.get("/:_id",panelConroller.getPanelById)
router.put("/",panelConroller.updatePanel)
router.delete("/:_id",panelConroller.deletePanel)

module.exports = router