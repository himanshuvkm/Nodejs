require('dotenv').config();

const express = require('express')
const connectToDB = require('../Autherization/database/db')
const authRoutes = require('./Routes/auth-routes')
const homeRoutes = require('./Routes/home-routes')
const adminRoutes = require('./Routes/admin-routes')

const app = express();

const port = process.env.Port || 3000;

//middleware 
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/home",homeRoutes)
app.use("/api/admin",adminRoutes)

app.listen(port , ()=>{
    console.log("Server running on 3000");
})
connectToDB()