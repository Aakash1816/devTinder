const mongoose = require("mongoose");


const connectDB = async ()=> {
 await   mongoose.connect("mongodb+srv://admin:admin@namastenode.qnp0h.mongodb.net/devTinder");

};

module.exports = connectDB;

