const express=require("express")
const {ProductModel}=require("../model/user.model")
const productRoute=express.Router();


productRoute.get("/",async (req,res)=>{
    try {
        const product = await ProductModel.find();
        res.send(product);
    } catch (error) {
        
    }
    res.send({"msg":"allproducts","req body":req.body})
})

productRoute.post("/addproduct",async(req,res)=>{
    try {
        const payload=req.body;
        const pro=new ProductModel(payload);
        await pro.save();
        res.send({"msg":"Product Added"});
    } catch (error) {
        res.status(500).send({"msg":"Something went wrong","Error":error})
    }
})
productRoute.delete("/deleteproduct/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        await ProductModel.findByIdAndDelete(id);
        res.send({"msg":"Product Delete"});
    } catch (error) {
        res.status(500).send({"msg":"Something went wrong","Error":error})
    }
})


module.exports={
    productRoute
}
