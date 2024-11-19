const express = require("express");

const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");




//Sending a connection request 
requestRouter.post("/request/send/:status/:toUserId" , userAuth , async(req,res)=>{
   try {
    const fromUserId = req.user._id;
    console.log(fromUserId);
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus  = ["ignored" , "interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({ message : "Invalid status type : " + status});
    }

    //Validation so that any randomm person can't send request to someone
    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({message : "user not found"});
    }
    
    //IF there is a existing connection request
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
           {fromUserId , toUserId}, // entery already present in the database
           {fromUserId: toUserId , toUserId: fromUserId} ,   
        ],   
    });
    // console.log(fromUserId , "hellooo");
    // console.log(toUserId , "Rajja");

    if(existingConnectionRequest){
        return res.status(400).send({messsage : "Connection Request already exist"});
    };

    const connectionRequest = new  ConnectionRequest({
        fromUserId ,
        toUserId,
        status,
    });
   
    const data = await connectionRequest.save();

    res.json({
        message: "Connection Request Sent Successfully !!" ,
        data , 
    });


   } catch (err) {

    res.status(400).send("ERROR : " + err.message);    
   }
 });

module.exports =  requestRouter ;
