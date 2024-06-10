const express = require("express");
const authRoutes = require("./routes/auth");
const { default: mongoose } = require("mongoose");
const validateUser = require("./middlewares/auth");
const postRoutes = require("./routes/post");

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(validateUser, postRoutes);

// mongodb+srv://jignesh:dUaszhl26B0rpW0f@cluster0.s7hzif4.mongodb.net/
mongoose.connect("mongodb://localhost:27017/blogApp")
.then(()=> console.log("Db connection successful"))
.catch(()=> console.log("Error while DB connection !"));

app.listen(10000,()=>{
    console.log("Server is up and running on port : 10000");
});