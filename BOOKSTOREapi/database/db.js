const mongoose = require('mongoose')
const connectToDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://himanshuvkm252:t4D11ZXr3aieTtJP@cluster0.h5z7igd.mongodb.net/').then(console.log("database connected successfully"))
    } catch (error) {
        console.log("Mongoose connection failed",error);
        process.exit(1);
    }
}

module.exports = connectToDB;