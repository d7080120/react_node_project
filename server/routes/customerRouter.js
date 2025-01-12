
const express = require("express")
const router = express.Router()
const customerConroller=require("../controllers/customerController")
const customerMW = require("../middleware/customerMW")
const masterMW = require("../middleware/masterMW")

router.get("/",masterMW,customerConroller.getAllCustomers)

router.use(customerMW)
router.get("/:_id",customerConroller.getCustomerById)
router.put("/",customerConroller.updateCustomer)
router.delete("/_id",customerConroller.deleteCustomer)

module.exports = router