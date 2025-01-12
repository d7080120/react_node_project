const express = require("express")
const router = express.Router()

const dailyLotteryConroller=require("../controllers/dailyLotteryController")
router.post("/", dailyLotteryConroller.createDailyLottery)
router.get("/",dailyLotteryConroller.getAllDailyLotterys)
router.get("/:_id",dailyLotteryConroller.getDailyLotteryById)
router.delete("/_id",dailyLotteryConroller.deleteDailyLottery)

module.exports = router