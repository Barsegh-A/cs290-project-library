const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    category: {
            type: String,
            required: false
    },

    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {timestamps: true});


const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;