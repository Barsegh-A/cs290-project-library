const Book = require("../models/book.model");
module.exports = {

    async add(bookData) {
        const book = new Book(bookData);
        const newBook = await book.save();
        return {newBook}
    },

    async getBook(id) {
        const book = await Book.findById(id);

        if (!book) {
            throw new NotFoundError(`Book with id = ${id} is not found!`);
        }

        return book;
    },

    async removeBook(id) {
        const book = await this.getBook(id);
        book.remove();
        return book;
    },

    async getAllBooks() {
        const books = await Book.find({});
        return books;
    },

    async updateBook(id, toUpdate) {
        const book = await this.getBook(id);
        book.set(toUpdate);
        book.save();
        return book;
    },
}
