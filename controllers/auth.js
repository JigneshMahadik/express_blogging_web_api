const userModel = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// JWT Secret Key
const jwtSecretKey = "MY_JWT_SECRET_KEY123";

const signUp = async (req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password,salt);
    const newUser = new userModel({ ...req.body,password : hashPassword });
    const newInstertedUser = await newUser.save();  //it'll create id that can be use later.
    
    res.json({
        status : true,
        message : "Registration successful."
    });
}

const login = async (req,res)=>{

    const user = await userModel.findOne({email : req.body.email});
    if(!user){
        return res.json({
            status : false,
            message : "User not found !"
        });
    }
    const isPassValid = bcrypt.compareSync(req.body.password, user.password);

    // Token creation
    const tokenExpiry = Math.ceil(new Date().getTime() / 1_000) + 3600; // 1hr validity
    const payload = {
      userId: user._id,
      name: user.name,
      exp: tokenExpiry,
    };

    // This function creates a token
    const token = jwt.sign(payload, jwtSecretKey);

    
    if(isPassValid){
        return res.json({
            token
        });
    }

    if(!isPassValid){
        return res.json({
            status : false,
            message : "Wrong password entered !"
        })
    }

}

const controllers = {
    signUp,
    login
};

module.exports = controllers;