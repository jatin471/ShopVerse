const express=require("express")
const cookieParser = require("cookie-parser")


const app =express()

app.use(cookieParser())
app.use(express.json())

const product =require("./routes/productRoute")
app.use("/api/v1",product)

const user = require("./routes/userRoute")
app.use("/api/v1",user)

module.exports=app