
const express = require("express")
const router = express.Router()

const constraintConroller=require("../controllers/constraintController")

router.post("/", constraintConroller.createConstraint)
router.get("/",constraintConroller.getAllConstraints)
router.get("/:_id",constraintConroller.getConstraintById)
router.put("/",constraintConroller.updateConstraint)
router.delete("/_id",constraintConroller.deleteConstraint)

module.exports = router