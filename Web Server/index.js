const fs = require('fs')
const http = require('http');
const url = require('url');

const replaceTemplate = (temp,product)=>{
    let output  = temp.replace(/{%PRODUCT_NAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%ID%}/g, product.id)

    if(!product.organic){
    output = output.replace(/{%NOT_ORGANIC%}/g,'Not-Organic')
    }else{
       output = output.replace(/{%NOT_ORGANIC%}/g,'Organic') 
    }

    return output
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataJson = JSON.parse(data)

const server = http.createServer((req,res)=>{
  
   const {query,pathname} = url.parse(req.url , true);
   
   
    if ( pathname ==='/' ){
        res.end('Welcome to the server ')     
    }
    else if (  pathname==='/overview'){
        res.writeHead(200,{'content-Type':'text/html'})
        const cardsHtml = dataJson.map(el=> replaceTemplate(tempCard,el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARD%}',cardsHtml)
        res.end(output)
    }
    else if  (pathname===`/product`){
        console.log(query);
        res.writeHead(200,{'content-Type':'text/html'})
        const product = dataJson[query.id]
        const output = replaceTemplate(tempProduct,product)
        res.end(output)
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
