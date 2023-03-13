const mongoose=require("mongoose");

const blacklistSchema=mongoose.Schema({
    token:String
},{
    versionKey:false
})

const BlackListModel = new mongoose.model("blacklist",blacklistSchema)

module.exports={
    BlackListModel
}