require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")

const app = express()
const PORT = process.env.PORT || 7000
connectDB()


app.use(cors(corsOptions))
app.use(express.json())
// app.use("/users", require("./routes/userRoute"))
app.use("/panel", require("./routes/panelRouter"))
app.use("/cost", require("./routes/costRouter"))
app.use("/api/auth", require("./routes/authRouter"))

app.get("/", (req, res)=>{res.send("This is home page")})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })
    mongoose.connection.on('error', err => {
    console.log(err)
    })