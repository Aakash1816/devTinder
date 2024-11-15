const mongoose = require('mongoose');
const  validator = require("validator");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const userSchema =  new mongoose.Schema({
    firstName : {
        type : String ,
        required : true ,
        minlength : 4 ,
        maxlength : 50 ,
    },
    lastName : {
        type : String ,
        maxlength : 50 ,
    },
    emailId : {
        type : String ,
        lowercase : true ,
        required : true ,
        unique : true ,
        trim : true ,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }

        },
    } ,
    password :{
        type : String ,
        required : true ,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password" + value);
            }

        },
    } ,
    age : {
        type : Number ,
        age : 18 ,
    } ,
    gender  :{
        type : String ,
        validate(value) {
            if(!["male" , "female" , "other"].includes(value)){
                throw new Error("Gender data  is not valid");
            }
        },
    },
    photoUrl : {
        type : String ,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL address" + value);
            }

        },
        
    },
    about :{
        type: String ,
        default : "This is the default about of the user " , 
    },
    skills : {
        type : [String] ,
    }
},{
    timestamps : true ,
});

userSchema.methods.getJWT = async function(){  // donot write rrow function in this that will not work
   try{
     const user = this ;

    const token =  await jwt.sign({_id:user.id},"DEV@Tinder790" , {expiresIn:"7d",});

    return token ;
   } catch (err){
    console.log(err.message + "ERROR")
   }
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    console.log(passwordInputByUser + "hnji");
    const user = this ;
    const passwordHash = user.password;
    console.log('passwordHash',passwordHash);

    const isPasswordValid = await bcrypt.compare(passwordInputByUser , passwordHash);
    
    return isPasswordValid;
    
};

module.exports = mongoose.model("user" , userSchema);
