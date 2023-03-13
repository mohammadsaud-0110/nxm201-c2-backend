const express=require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {UserModel} = require("../model/user.model")
const {BlackListModel}=require("../model/blacklist.model")
require("dotenv").config();

const userRoute = express.Router();

userRoute.post("/signup", async( req, res ) => {
    try {
        const {email,password,role} = req.body;
        const user= await UserModel.find({email})
        if(user.length>0){
            res.send({"msg":"User already Registered, go to login"})
        }
        else{
            bcrypt.hash(password, 4, async(err, hash) => {
                if(err){
                    res.status(500).send({"msg":"Something went wrong","Error":err});
                }
                else if(hash){
                    const newuser = new UserModel({email,password:hash,role})
                    await newuser.save();
                    res.send({"msg":"User Registered Successfully"})
                }
            });
        }
    } 
    catch (error) {
        res.status(400).send({"msg":"Something went wrong","Error":error});
    }
})

userRoute.post("/login", async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user= await UserModel.find({email})
        if(user.length!==0){
            bcrypt.compare(password, user[0].password, async(err, result) => {
                if(result){
                    const accessToken = jwt.sign({userID:user[0]._id},process.env.accessToken_secretKey,{ expiresIn: "1m" });

                    const refreshToken = jwt.sign({userID:user[0]._id},process.env.refreshToken_secretKey,{ expiresIn: "5m" });

                    res.send({"msg":"Login Successful","Access Token":accessToken,"Refresh Token":refreshToken});
                }
                else if(result == false){
                    res.status(401).send({"msg":"Wrong Password"})
                }
                else if(err){
                    res.send({"msg":"Something went wrong","Error":err})
                }
            });
        }
        else{
            res.send({"msg":"User Not Registered"});
        }
    } catch (error) {
        res.status(500).send({"msg":"Something went wrong","Error":err});
    }
})

userRoute.post("/logout", async(req,res)=>{
    try {
        const token = req.headers.authorization;
        if(token){
            const btoken = new BlackListModel({token})
            await btoken.save();
            res.send({"msg":"Logout Successful"})
        }
        else{
            res.send({"msg":"Already Logged out"})
        }
    } catch (error) {
        res.status(500).send({"msg":"Something went wrong","Error":err});
    }
    
})

module.exports={
    userRoute
}