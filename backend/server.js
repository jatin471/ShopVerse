const { connect } = require("http2")
const app=require("./app")
const dotenv=require("dotenv")
const connectToDatabase =require("./config/db")

dotenv.config({path: "backend/config/config.env"})



process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    process.exit(1);
})

connectToDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`Running on port http://localhost:${process.env.PORT}`)
})
