const Book = require('../models/book');



const getAllBooks = (req, res)=>{
    Book.find({}, (err, books)=>{
        if(err){
            let fault_response = {
                status_code: res.statusCode,
                message: "There was en error! Try again please!",
                details: err.message
            }
            res.json(fault_response)
        }else{
            if(books.length>0){
                let success_response = {
                    status_code: res.statusCode,
                    message: "Books successfully fetched from db",
                    books: books
                }
                res.json(success_response);
            }else{
                let success_response = {
                    status_code: res.statusCode,
                    message: "No Book Founded!",
                    details: "No book has been added yet to DB"
                }
                res.json(success_response)
            }
        }
    })
}




const addNewBook = (req, res)=>{
    const {book_name, book_type, page_numbers, author, publish_date} = req.body;
    const newBook = new Book({
        book_name: book_name,
        book_type: book_type,
        page_numbers: page_numbers,
        author: author,
        publish_date: publish_date
    });
    newBook.save((err)=>{
        if(err){
            let fault_response = {
                status_code: res.statusCode,
                message: "There was en error! Try again please!",
                details: err.message
            }
            res.json(fault_response)
        }else{
            let success_response = {
                status_code: res.statusCode,
                message: "The new book has been successfully added!",
                book_details: newBook
            }
            res.json(success_response);
        }
    })
}




const deleteAllBooks = (req, res)=>{
    Book.deleteMany({}, (err)=>{
        if(err){
            let fault_response = {
                status_code: res.statusCode,
                message: "Could'nt delete all the books!",
                details: err.message
            }
            res.json(fault_response)
        }else{
            let success_response = {
                status_code: res.statusCode,
                message: "All the books has been successfully removed from db",
            }
            res.json(success_response);
        }
    });
}

module.exports = {getAllBooks, addNewBook, deleteAllBooks};