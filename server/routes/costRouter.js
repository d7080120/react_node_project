
const express = require("express")
const router = express.Router()

const costConroller=require("../controllers/costController")

router.post("/", costConroller.createCost)
router.get("/",costConroller.getAllCosts)
router.get("/:_id",costConroller.getCostById)
router.put("/",costConroller.updateCost)
router.delete("/_id",costConroller.deleteCost)

module.exports = router