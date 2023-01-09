const Book = require('../models/book');



const getBook = (req, res)=>{
    const book_id = req.params.book_id;
    Book.findOne({_id: book_id}, (err, book)=>{
        if(err){
            let fault_response = {
                status_code: res.statusCode,
                message: "There was en error! Try again please!",
                details: err.message
            }
            res.json(fault_response)
        }else{
            if(book){
                let bookViewCount = book.view_count;
                Book.updateOne({_id: book_id},{view_count: bookViewCount+1}, (err)=>{
                    if(err){
                        res.json(err.message)
                    }else{
                        let success_response = {
                            status_code: res.statusCode,
                            message: "The book successfully fetched from db",
                            book_details: book
                        }
                        res.json(success_response);
                    }
                })
            }else{
                let success_response = {
                    status_code: res.statusCode,
                    message: "No book founded for the given id!"
                }
                res.json(success_response)
            }
        }
    })
}



const updateBook = (req, res)=>{
    const book_id = req.params.book_id;
    Book.findOne({_id: book_id}, (err, book)=>{
        if(err){
            let fault_response = {
                status_code: res.statusCode,
                message: "There was en error! Try again please!",
                details: err.message
            }
            res.json(fault_response)
        }else{
            if(book){
                Book.updateOne(
                    {_id: book_id},
                    {$set:req.body},
                    (err)=>{
                        if(err){
                            let fault_response = {
                                status_code: res.statusCode,
                                message: "Update failed! Try again please!",
                                details: err.message
                            }
                            res.json(fault_response)
                        }else{
                            Book.findOne({_id: book_id}, (err, foundedBook)=>{
                                if(err){
                                    res.json(err.message);
                                }else{
                                    let success_response = {
                                        status_code: res.statusCode,
                                        message: "The book has been successfully updated!",
                                        book_details: foundedBook
                                    }
                                    res.json(success_response);
                                }
                            })
                        }
                });
            }else{
                let success_response = {
                    status_code: res.statusCode,
                    message: "No book founded for the given id!"
                }
                res.json(success_response)
            }
        }
    })
}


const deleteBook = (req, res)=>{
    const book_id = req.params.book_id;
    Book.deleteOne({_id: book_id}, (err)=>{
        if(err){
            let fault_response = {
                status_code: res.statusCode,
                message: "Delete failed! Try again please!",
                details: err.message
            }
            res.json(fault_response)
        }else{
            let success_response = {
                status_code: res.statusCode,
                message: "The Book successfully deleted from db"
            }
            res.json(success_response)
        }
    })
}

const downloadBook = (req, res)=>{
    const book_id = req.params.book_id;
    Book.findOne({_id: book_id}, (err, book)=>{
        if(err){
            let fault_response = {
                status_code: res.statusCode,
                message: "Download failed! Try again please!",
                details: err.message
            }
            res.json(fault_response)
        }else{
            if(book){
                let bookViewCount = book.view_count;
                let downloadCount = book.download_count;
                Book.updateOne({_id: book_id},{view_count: bookViewCount+1, download_count: downloadCount+1}, (err)=>{
                    if(err){
                        res.json(err.message)
                    }else{
                        let success_response = {
                            status_code: res.statusCode,
                            message: "The book successfully Downloaded",
                            book_details: book
                        }
                        res.json(success_response);
                    }
                })
            }else{
                let success_response = {
                    status_code: res.statusCode,
                    message: "Download failed! No book founded for the given id!"
                }
                res.json(success_response)
            }
        }
    })
}


module.exports = {getBook, updateBook, deleteBook, downloadBook};