const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
router.post("/login", authController.login)
router.post("/registerCustomer", authController.registerCustomer)
router.post("/registerParticipant", authController.registerParticipant)
router.post("/registerMaster", authController.registerMaster)



module.exports = router