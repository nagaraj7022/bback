const express=require("express")
const app=express()
app.use(express.json())
const bcrypt=require("bcrypt")
const cors=require("cors")
const jwt =require("jsonwebtoken")
const { connection } = require("./configure/confige")
const {UserModel}=require("./models/user.model")
const {PostModel}=require("./models/post.model")
const {userRouter}=require("./routes/user.route")
const {postRouter}=require("./routes/post.route")

const {authenticate}=require("./middleware/auth.middleware")


app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.json("nagaraj")
})
app.use("/user",userRouter)

app.use("/post",postRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to mongo db")
    }catch(err0r){
        console.log(error)
    }
})