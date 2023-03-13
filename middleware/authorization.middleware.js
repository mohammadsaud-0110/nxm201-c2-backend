const {UserModel}=require("../model/user.model")

const authorize = async(req,res,next)=>{
    const user = await UserModel.find({_id:`${req.body.user}`})
    if(req.url == "/product" && user[0].role == "consumer" ){
        next();
    }
    else if(req.url == "/product/addproduct" && req.method == "POST" && user[0].role == "seller" ){
        next();
    }
    else if(req.url == "/product/deleteproduct/:id" || req.method == "DELETE" && user[0].role == "seller" ){
        next();
    }
    else{
        res.status(403).send({"msg":"Not Authorized"})
    }
}

module.exports={
    authorize
}