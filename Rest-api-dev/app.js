// Import express framework
const express = require('express');
const app = express();

// Middleware to handle incoming JSON data
app.use(express.json());

// In-memory data (temporary array to store books)
 const Books = [
  { id: 1, label: "Book 1" },
  { id: 2, label: "Book 2" },
  { id: 3, label: "Book 3" },
];

// Homepage route - just sends a welcome message
app.get('/', (req, res) => {
  res.json({ message: "Welcome to our bookstore api" });
});

// Get all books - returns the entire list of books
app.get('/get', (req, res) => {
  res.json(Books);
});

// Get a single book by ID - uses req.params to get dynamic value
app.get('/get/:id', (req, res) => {
  const book = Books.find(bookItem => bookItem.id === parseInt(req.params.id));

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: 'Book not found with this ID, try another one',
    });
  }
});

// Add a new book - pushes a new book object into the array
app.post('/add', (req, res) => {
  const newBook = {
    id: Books.length + 1, // auto-incrementing id
    label: `book ${Books.length + 1}` // default label
  };

  Books.push(newBook);

  res.status(200).json({
    data: newBook,
    message: "New book is added successfully"
  });
});

// Update a book's label - updates label using the request body
app.put('/update/:id', (req, res) => {
  const findCurrentBook = Books.find(bookItem => bookItem.id === parseInt(req.params.id));

  if (findCurrentBook) {
    // If new label is given, update it. Else keep old one.
    findCurrentBook.label = req.body.label || findCurrentBook.label;

    res.status(200).json({
      data: findCurrentBook,
      message: `Book with ID ${findCurrentBook.id} is updated successfully`
    });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book - removes a book based on ID
app.delete('/delete/:id', (req, res) => {
  const findIndexbook = Books.findIndex(bookItem => bookItem.id === parseInt(req.params.id));

  if (findIndexbook !== -1) {
    const deletedBook = Books.splice(findIndexbook, 1); // remove book from array

    res.status(200).json({
      data: deletedBook[0],
      message: `Book with ID ${parseInt(req.params.id)} is deleted successfully`
    });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Start server and listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log("Server started and running on port 3000");
});
