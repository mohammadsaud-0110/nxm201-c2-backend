const jwt=require("jsonwebtoken")
const {BlackListModel}=require("../model/blacklist.model")
require("dotenv").config();

const authenticate = async(req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(token){
        let btoken = await BlackListModel.find({token:`${token}`});
        if(btoken.length!==0){
            res.status(403).send({"msg":"Login Again"});
        }
        else{
            jwt.verify(token, process.env.accessToken_secretKey, async(err,decoded)=>{
                if(decoded){
                    req.body.user=decoded.userID;
                    next();
                }
                else{
                    res.send({"Error":err.message})
                }
            })
        }
    }
    else{
        res.send({"msg":"Login Again"});
    }
}

module.exports={
    authenticate
}