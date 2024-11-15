const express= require("express");
const connectDB = require("./config/database");
const app= express();
const cookieParser = require("cookie-parser");
const User = require("./models/user");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);


// Find the user from the database from the email 
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId : userEmail});
       if(users.length=== 0){
        res.status(404).send("user not found ");
       }else {
        res.send(users)
       }
        
    } catch(err){
        res.status(400).send("Something went wrong ");
    }

});

// Feed API - GET /feed - get all the useres from the database 
app.get("/feed" ,async (req,res)=>{
   try {
    const users = await User.find({});
    res.send(users);
   } catch (error) {
    res.status(400).send("Something not found");
   } 
    
});

// delete the user by using its userId
app.delete("/user",async(req,res)=>{
    const  userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({userId});
        res.send("User deleted successfully ");
    } catch (error) {
      res.status(400).send("Something went wrong");  
    }
});
 

//Update the user 
// app.patch("/user", async(req,res)=>{
//     const userId = req.body.userId;
app.patch("/user/:userId", async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;

  console.log(data);
  try {
    const ALLOWED_UPDATES = ["skills" , "photoUrl" , "about" , "gender" , "age",];

    const isUpdateAllowed = Object.keys(data).every((k)=>
       ALLOWED_UPDATES.includes(k)
   );
   
   if(!isUpdateAllowed) {
     throw new Error("updates are not allowed");
   }
   if(data?.skills.length > 10){
    throw new Error("Skills cannot be moore  than 10");
   }
    const user = await User.findByIdAndUpdate({_id : userId} , data ,{
        returnDocument: "after" ,
        runValidators :  true ,
    });
    console.log(user);
    res.send("user updated  successfully!");
  } catch (error) {
    res.status(400).send("Update  Failed : " +  error.message);
  }

});

connectDB()
.then(()=>{
    console.log("connection has been created successfully!!");

    app.listen(3000 , ()=>{
        console.log("Server is listening on port 3000....");
    }); 
})
.catch((error)=>{
    console.log(error.message + "Database cannot be connected!!!");
});

