const database = require('mime-db');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    tittle :{
        type : String,
        required : [true,'Book tittle is required'],
        trim : true,
        maxLength : [100,'Book tittle can not be more than 100 characters']
    },
    author :{
        type : String,
        required : [true,'Author name is required'],
        trim : true,
        maxLength : [100,'Author name can not be more than 100 characters']
    }, 
    Year : {
        type : Number,
        required : [true,'Publication Year is required'],
        min :[1000,"Year must be atleast 1000"],
        max:[new Date().getFullYear(),'Year cannnot be in future']
    },
    CreatedAt : {
        type : Date,
        default : Date.now()
    }
})
const book = mongoose.model("book",bookSchema);
module.exports = book