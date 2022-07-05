const express= require("express");
const app= express();
const cookieParser= require("cookie-parser");

const bodyParser = require("body-parser");
const fileUpload= require("express-fileupload");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({limit:"1000MB",extended:true}));
app.use(express.json({limit:"1000MB"}));
app.use(cookieParser());
app.use(fileUpload());

//Dotenv helps to find out the value of process.env.PORT 
const dotenv = require("dotenv");
//importing middlware error
const errorMiddleware = require("./middleware/error");

//config and giving path 
dotenv.config({path:"Backend/config/config.env"});

//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
//middleware for errors
app.use(errorMiddleware);



//to export the app to use in another folder.
module.exports=app
