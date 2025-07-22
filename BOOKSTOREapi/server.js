require('dotenv').config()
const express = require('express')
const app = express()
const connectToDB = require('./database/db')
const booksRoutes = require('./routes/book-route')
const port = process.env.PORT
// connect to Database
connectToDB();

//middleware
app.use(express.json());

//routes here
app.use ('/api/books',booksRoutes)


app.listen(port,()=>{
    console.log("Server is listening to 3000");
})