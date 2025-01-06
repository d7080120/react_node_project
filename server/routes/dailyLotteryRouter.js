const express = require("express")
const router = express.Router()

const dailyLotteryConroller=require("../controllers/dailyLotteryController")

router.post("/", dailyLotteryConroller.createdailyLottery)
router.get("/",dailyLotteryConroller.getAlldailyLotterys)
router.get("/:_id",dailyLotteryConroller.getdailyLotteryById)
router.put("/",dailyLotteryConroller.updatedailyLottery)
router.delete("/:_id",dailyLotteryConroller.deletedailyLottery)

module.exports = router