const express=require("express")
const mongoose = require('mongoose');

const SignUpPAth=require("./routes/SignUpRoute")
const LoginPath=require("./routes/LoginRoute")


mongoose.connect("mongodb://localhost/A")
    .then(()=>console.log("connected to database hhhh"))
    .catch((err)=>console.log("ERRROOOr",err))///RETOURNE PROMESSE 
const app=express()

app.use(express.json())


app.use("/api/SignUp",SignUpPAth)
app.use("/api",LoginPath)



const port =5000
  

app.listen(port, ()=>console.log("Server Running eyyyy!!"))