const express= require("express");

const profileRouter = express.Router();
const bcrypt = require("bcrypt");

const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require ("../utils/validation");

//API to get your profile
profileRouter.get("/profile" ,userAuth, async(req , res)=>{
 
    try{ 
  
    const user = req.user;
     
    res.send(user);
    } catch (error){
      res.status(400).send("ERROR : " + error.message);
    }
  });

//API to edit the profile
profileRouter.patch("/profile/edit" , userAuth , async (req,res)=>{
try {
  if(!validateEditProfileData(req)) {
    throw new Error("Invalid Edit Request");
  }
 
  const loggedInUser = req.user;
  
 Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

 res.send(`${loggedInUser.firstName} , your profile updated successfully`);
 
 await loggedInUser.save();

} catch (error) {
  res.status(400).send("ERROR : " + error.message);
}
});

profileRouter.post('/Resetpassword' ,userAuth ,async(req,res)=>{
  try{
  const user = req.user;
    const {password} = req.body; 
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    user.password = passwordHash;
    await user.save();
    res.cookie("token" , null , {
      expires: new Date(Date.now()),
   });
    res.send('Password reset successful');
  } catch (error) {
    res.status(400).send('Invalid or expired token' +error.message);
  }
});



module.exports = profileRouter;
