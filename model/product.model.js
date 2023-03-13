const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    title:String,
    price:Number,
    user:String
},{
    versionKey:false
})

const ProductModel = new mongoose.model("product",productSchema)

module.exports={
    ProductModel
}