const express = require("express");
const authRouter = express.Router();
const {validateSignUpData}= require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");




//API to signup user 
authRouter.post("/signup" , async (req,res)=>{
    try{
    // Validdation of the data 
    validateSignUpData(req);
   
    const {firstName , lastName ,emailId , password} =  req.body;
    //Encrypt the password
    const passwordHash =  await bcrypt.hash(password , 10);
   

   
       // Creating a new instance of the user model
       const user = new User({
           firstName ,
           lastName,
           emailId,
           password : passwordHash,
       });
         
       await user.save();
      res.send("User addedd Successsfully");
       } catch (err){
           res.status(400).send("Error saving the user " + err.message);
       }
   }) ;


// API to login the user 
authRouter.post("/login" , async (req,res)=>{
    try {
      const {emailId , password } = req.body;
      
  
      const user = await User.findOne({emailId : emailId});
         if(!user){
          throw new Error("Invalid Credentials");
         }
      const isPasswordValid = await user.validatePassword(password);
    
      
  
      if (isPasswordValid){
     
      //Create a JWT Token
      const token = await user.getJWT();
  
      //Add the token to cookie and send the response back to the user .
      res.cookie("token" , token);
     
  
      res.send("Login Successful !!!!");
      }else{
          throw new Error("Invalid Credentials123 ");
      }
  
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  });

//API to logout
authRouter.post("/logout" , async(req,res)=>{
 res.cookie("token" , null , {
    expires: new Date(Date.now()),
 });
 res.send("Logout successfully!!!");
});

module.exports = authRouter;
