// Importing Fs module
const fs = require("fs")
const Fs = require('fs/promises')

const content1= 'Avocado is a fruit, botanically classified as a large berry, known for its creamy, nutrient-rich flesh and buttery texture'

const content2='It is the fruit of the Persea americana tree, native to the Americas, and widely cultivated in warm climates'

const content3 ='Avocados are popular for their versatility in culinary applications, from guacamole to salads and smoothies, and are valued for their nutritional benefits. ' 

// Write and read file synchronously

try {
    fs.writeFileSync('./txt/output.txt', 'hey my name is avacardo: ');
    console.log('File written successfully!')}
     catch (error) {
    console.error('Error writing file:', error);
}

try {const textIn= fs.readFileSync("./txt/output.txt","utf-8")
console.log(textIn);
} catch (error) {
    console.error(error)
}

// Write and read file Asynchronously
 
const readIn = fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
    if (err) {
        return console.log(err);
    }
    console.log(data);
})

fs.writeFile(`txt/end.txt`,content3,err=>{
    if (err) {
       console.error('There an error',err) 
    }
    else{console.log('file written successfully');}
})

//Reading and writing a File with Promises

async function example() {
    try {
        await Fs.writeFile("txt/append.txt",content2 )
    } catch (err) {
        console.error('There an error',err) 
    }
    
}
example()

async function example1() {
    try {
        const data1=await Fs.readFile("txt/append.txt",{encoding:'utf-8'} )
        console.log(data1);
    } catch (err) {
        console.error('There an error',err) 
    }
    
}
example1()
