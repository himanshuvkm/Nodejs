const express = require("express");
const app = express();

// Custom logger middleware

const middlewarefn = (req, res, next) => {
  console.log(`${req.method}${req.url}`);
  next(); // passes control to the next middleware or route handler
};

app.use(middlewarefn);

app.get("/", (req, res) => {
  res.send("Welcome to the site");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(4000,()=>{
    console.log("listening to server");
})

//Middleware to block or allow route access

const auth = (req,res,next)=>{
    isLoggedIn = true;
    if (isLoggedIn){
        next()
    }
    else{
        res.status(401).send("Unauthorised ")
    }
}

app.get("/dashboard", auth, (req, res) => {
  res.send("Welcome to Dashboard");
});
