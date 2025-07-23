const mongoose = require("mongoose");

const connectToDB = async ()=>{
try { 
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MonGoDB connected successfully");
    
} catch (e) {
    console.log(e);
    process.exit(1)
}}
module.exports = connectToDB;
