const express=require("express")
const {connection} = require("./config/mongoose")
const {userRoute} = require("./route/user.routes")
const {productRoute}=require("./route/product.route")
const {authenticate}=require("./middleware/authentication.middleware")
const {authorize}=require("./middleware/authorization.middleware")
const cors=require("cors")
require("dotenv").config();



const app = express();
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page for NXM201 C2")
})

app.use("/user",userRoute)

app.use(authenticate)

app.use(authorize)

app.use("/product", productRoute)


app.listen(process.env.portNO, async ()=> {
    try {
        await connection;
        console.log("Connection to DB : Successful")
        console.log("Server port :",process.env.portNO);    
    } catch (error) {
        console.log("Something Went Wrong");
        console.log(error);
    }
})