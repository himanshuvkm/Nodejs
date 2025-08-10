require('dotenv').config();

const express = require('express')
const connectToDB = require('../Autherization/database/db')
const authRoutes = require('./Routes/auth-routes')
const homeRoutes = require('./Routes/home-routes')
const adminRoutes = require('./Routes/admin-routes')
const imageRoute = require('./Routes/image-route')

const app = express();

const port = process.env.PORT || 8000;

//middleware 
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/home",homeRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/image",imageRoute)

app.listen(port , ()=>{
    console.log("Server running on 8000");
})
connectToDB()