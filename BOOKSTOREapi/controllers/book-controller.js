const book = require("../models/Book.js");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "All books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong try again",
    });
  }
};
const getSingleBookById = async (req, res) => {
  try {
    const getCurrentById = req.params.id;
    const bookDetailById = await book.findById(getCurrentById);
    if (bookDetailById) {
      res.status(200).json({
        success: true,
        message: " books fetched successfully",
        data: bookDetailById,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found with this id ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong try again",
    });
  }
};
const updateBook = async (req, res) => {
try { 
    const updateBookFormData = req.body;
    const getbookbyID = req.params.id;
    const updatedbook = await book.findByIdAndUpdate(getbookbyID,updateBookFormData,{
        new:true
    })
    if(updatedbook){
        res.status(200).json({
        success: true,
        message: " books updated successfully",
        data: updatedbook
    })
        
    }
    else {
      res.status(404).json({
        success: false,
        message: "No books found with this id ",
      })}
}
catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong try again",
    });
  }

};
const addNewBook = async (req, res) => {
  try {
    const newbookFormData = req.body;
    const newlyCreatedBook = await book.create(newbookFormData);
    if (newbookFormData) {
      res.status(200).json({
        success: true,
        message: "Book added successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteBook = async (req, res) => {
  try {
    const getBookId = req.params.id;
    const deletedBook = await book.findByIdAndDelete(getBookId);

    if (deletedBook) {
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No book found with the provided ID",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  updateBook,
  addNewBook,
  deleteBook,
};
