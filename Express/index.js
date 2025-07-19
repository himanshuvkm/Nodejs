const express = require ('express')
const app = express()
app.get('/',(req,res)=>{
    res.send("Hello my World");
})
app.get('/about', (req, res) => {
  res.send('About Page');
 
});

const port = 8000;
app.listen(port,()=>{
    console.log("Server is running ");
    
})