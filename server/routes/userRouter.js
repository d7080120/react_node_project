
const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const userConroller=require("../controllers/userController")

router.use(verifyJWT)
router.post("/", userConroller.createUser)
router.get("/",userConroller.getAllUsers)
router.get("/:_id",userConroller.getUserById)
router.put("/",userConroller.updateUser)
router.delete("/:_id",userConroller.deleteUser)

module.exports = router