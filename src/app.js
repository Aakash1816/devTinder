const express= require("express");

const app= express();


//this will only handle GET calls to /user 
app.get("/user" , (req, res)=>{
    res.send({firstname : "Akash" , lastname : "pathak"});
});

app.post("/user" , (req,res)=>{
    console.log("save the data to the database");
    res.send("Data  has been successfully to the dtatabse ");
});

app.delete("/user",(req,res)=>{
    console.log("data deleted ");
    res.send("Data deleted!");
});

//this  will match all  the HTTP  method API calls to  /test  
app.use("/test" , (req,res)=>{
    res.send("Hello from the server ");
});

app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000....");
}); 