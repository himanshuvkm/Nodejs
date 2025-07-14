const fs = require('fs')
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataJson = JSON.parse(data)

const server = http.createServer((req,res)=>{
   console.log(req);
   const url = req.url;
   
    if ( url ==='/' ){
        res.end('Welcome to the server ')
    }
    else if (  url==='/overview'){
        res.end('This is the overview')
    }
    else if  (url==='/hello'){
        res.end('Hello from the server')
    }
     else if  (url==='/api'){
        res.writeHead(404,{'Content-Type':'application/json'})
        res.end(data)
    }
    else{
        res.writeHead(404,{'content-Type':'text/html'})
        res.end(
           '<h1>404 Error </h1>'
        )
    }

})
server.listen(2000, '127.0.0.1',()=>{
console.log('listening to the request on port 2000');

})
