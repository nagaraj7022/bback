const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../models/user.model")
const connection = require("../configure/confige")
const dns = require("dns")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


userRouter.post("/register",async(req,res)=>{
   
    const {name,email,gender,password,age,city,is_married} = req.body
    const userpresent = await UserModel.findOne({email})
    if(userpresent){
        res.status(200).send("User already exist, please login")
    }else{
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
          
         const user = new UserModel({name,email,gender,password:hash,age,city,is_married})
        await user.save()
        res.json("User already exist, please login")
        console.log(user)
        })
        
    }catch (error) {
        console.log(Error)
        res.json("error in register")
    }
}
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
    try {
        const user = await UserModel.find({email})

        if(user.length>0){
          const hashed_pass = user[0].password;
          bcrypt.compare(password, hashed_pass, (err, result)=>{
         if(result){
              const token = jwt.sign({"userID":user[0]._id},'nagaraj',{expiresIn:"1h"})
              res.json({"msg":"Login Successfully","token":token})
         }else{
            res.json({"msg":"Login failed"})
         }
        })
           
           }else{
               res.json({"msg":"Wrong Credential"})
               console.log(err)
           }

    } catch (error) {
        console.log(Error)
        res.json("Something went wrong")
    }
})

module.exports ={
    userRouter
}