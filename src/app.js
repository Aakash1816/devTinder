const express= require("express");

const app= express();

app.use("/test",(req,res)=>{
    res.send("Namaste from the server ");  // request handler (name of this  function)
});

app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000....");
}); 