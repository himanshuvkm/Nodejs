const express = require('express')
const app = express();

// Application level settings

app.set('view engine ','ejs')

//routing
app.post ('/message',(req,res)=>{
    res.json({
        message : "Data received",
        data : req.body
    })
})
app.listen(2000)