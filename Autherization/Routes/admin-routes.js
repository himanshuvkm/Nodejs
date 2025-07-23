const express = require('express')
const { message } = require('statuses')
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router()
const isAdminUser = require('../middleware/admin-middleware')



router.get('/welcome',authMiddleware,isAdminUser,(req,res)=>{
    res.json({
        message: 'Welcome to the admin page '
    })
})
module.exports = router;