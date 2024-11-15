const express= require("express");

const app= express();

//: means its a dynamic route 
app.get("/user/:userId" , (req, res)=>{
    console.log(req.params);
    res.send({firstname : "Akash" , lastname : "pathak"});
});


// this  is how you read the query parameters
app.get("/user" , (req, res)=>{
    console.log(req.query);
    res.send({firstname : "Akash" , lastname : "pathak"});
});




//this will only handle GET calls to /user 
app.get("/user" , (req, res)=>{
    res.send({firstname : "Akash" , lastname : "pathak"});
});

//this will use /abc , /ac
app.get("/ab?c" , (req, res)=>{
    res.send({firstname : "Akash" , lastname : "pathak"});
});


//this will use /abc , /abbbbbbc , multiple numbers of b
app.get("/ab+c" , (req, res)=>{
    res.send({firstname : "Akash" , lastname : "pathak"});
});

//this will use /abcd , ab and anything in between and then cd 
app.get("/ab*cd" , (req, res)=>{
    res.send({firstname : "Akash" , lastname : "pathak"});
});



//this will use /abcd , in this bc is optional we can combin things too in this 
app.get("/a(bc)?d" , (req, res)=>{
    res.send({firstname : "Akash" , lastname : "pathak"});
});

//this will use /a, and it will use anything which uses a like cab car  , /.*fly$/
app.get(/a/ , (req, res)=>{
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