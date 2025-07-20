const express = require('express')
const path = require('path')
const app = express()

// set the view engine 
app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))

const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "Product 3",
    },
  ];

app.get('/',(req,res)=>{
    res.render('home',{title:'home',
        products
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'about',
        products
    })
})
const port = 3000
app.listen(port,()=>{
    console.log("Server Listened");
})