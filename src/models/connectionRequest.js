const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId :{
        type : mongoose.Schema.Types.ObjectId ,
        required : true ,
    } ,
    toUserId :{
        type : mongoose.Schema.Types.ObjectId ,
        required : true ,
    },
    status : {
        type : String ,
        enum :{
            values : ["ignored", "interested" , "accepted" , "rejected"],
            message : `{VALUE} is incorrect status type  `
        } ,
        required : true ,
    }
} , {
    timestamps : true ,
});
 
//ConnectionRequest.find({fromUserId : 756235454553543545}) => this is knownn as compound index , because of which the queries become fast 1(asc) -1(desc)
connectionRequestSchema.index({fromUserId : 1 , toUserId : 1});


connectionRequestSchema.pre("save" , function (next){
const connectionRequest = this ;
//Check if fromUserId is same as toUserId
if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection request to Yourself!!!");
}
next();
});



const ConnectionRequest = new mongoose.model("ConnectionRequest" , connectionRequestSchema) ; // Name of the starts with Caps and in brackets first is name of the model thne followed by name of the schema 

module.exports = ConnectionRequest ;