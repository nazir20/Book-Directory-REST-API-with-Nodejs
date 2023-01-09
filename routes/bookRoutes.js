const express = require('express');
const {getAllBooks, addNewBook, deleteAllBooks} = require('../controllers/booksController');
const {getBook, updateBook, deleteBook, downloadBook} = require('../controllers/bookController');
const router = express.Router();

router.route('/').get(getAllBooks).post(addNewBook).delete(deleteAllBooks);
router.route('/books/:book_id').get(getBook).patch(updateBook).delete(deleteBook)
router.route('/books/downloads/:book_id').get(downloadBook)

module.exports = router;