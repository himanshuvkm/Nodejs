const express = require ('express')
const app = express();

//Middleware 
app.use(express.json())

const Books = [
    {
      id: 1,
      label: "Book 1",
    },
    {
      id: 2,
      label: "Book 2",
    },
    {
      id: 3,
      label: "Book 3",
    },
  ];

  //intro route
  app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to our bookstore api"
    });
  });

  //Get all books 

  app.get('/get',(req,res)=>{
    res.json(Books);
  });

  //Get single book

  app.get('/get/:id',(req,res)=>{
    const book = Books.find(bookItem=> bookItem.id===parseInt(req.params.id)
    )
    if (book) {
        res.status(200).json(book)
    }else{
        res.status(404).json({
            message:'Book does not found with this id try with another one'
        })
    }
  })

  //add a new book

  app.post('/add',(req,res)=>{
    const newBook = {
        id: Books.length + 1,
        label:  `book ${Books.length + 1}`
    }
    Books.push(newBook);
    res.status(200).json({
        data:newBook,
        message:"New Book is added succesfully"
    })
  })

    // update a book 
    // put is a method used for updating something

   app.put('/update/:id', (req, res) => {
    const findCurrentBook = Books.find(bookItem => bookItem.id === parseInt(req.params.id));

    if (findCurrentBook) {
        findCurrentBook.label = req.body.label || findCurrentBook.label;

        res.status(200).json({
            data: findCurrentBook,
            message: `Book with id ${findCurrentBook.id}  is updated successfully`
        });
    } else {
        res.status(404).json({
            message: "Book not found"
        });
    }
});

//delete a item 
app.delete('/delete/:id',(req,res)=>{
    const findIndexbook = Books.findIndex(bookItem => bookItem.id === parseInt(req.params.id))
    if(findIndexbook != -1){
      const deletedBook = Books.splice(findIndexbook,1);
      res.status(200).json({
        data: deletedBook[0],
        message: `Book with index ${parseInt(req.params.id)}  is deleted successfully`
      })
    }
    else {
        res.status(404).json({
            message: "Book not found"
        });
    }
})


  const port = 3000
  app.listen(port,()=>{
    console.log("Server started and running on port 3000");
  })
