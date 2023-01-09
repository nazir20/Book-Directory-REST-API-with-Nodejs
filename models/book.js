const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_name:{
        type: String,
        required: true
    },
    book_type:{
        type: String,
        required: true
    },
    page_numbers:{
        type: Number,
        required: true
    },
    author:{
        type: String,
        require: true
    },
    publish_date:{
        type:Date,
        default: Date.now
    },
    view_count:{
        type: Number,
        default: 0
    },
    download_count:{
        type: Number,
        default: 0
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;