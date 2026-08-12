const express = 
require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/databaseconfig");
const app = express();
const productRoutes = require("./routes/productroute");
const userRoutes = require("./routes/userroute");
dotenv.config();// load environment variables from .env files
connectDB();//connect to mongoDB
app.use(express.json()); //middleware to parse json request bodies

//Routes
app.use("/products",productRoutes);// use the product route for all request stsrting 
//with the /product
app.use("/users",userRoutes); // use user route for all request stsrting 
//with the /use
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});