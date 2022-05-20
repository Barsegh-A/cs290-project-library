const express = require("express");
const {auth} = require("../middleware/auth");
const booksService = require("../services/books.service");
const asyncHandler = require('express-async-handler');

const router = new express.Router();

router.post("/add", auth, asyncHandler(async (req, res) => {
    if(req.user.role !=='admin'){
        return res.status(401).send({message: "You don't have permission"});
    }
    const book = req.body;
    const {newBook} = await booksService.add(book)
    res.status(201).send({book: newBook});
}))


router.get('/:id/', auth, asyncHandler(async (req, res, next) => {
    const id = req.params['id'];
    const result = await booksService.getBook(id);
    res.status(200).send(result);
}))

router.get('/', auth, asyncHandler(async (req, res) => {
    const result = await booksService.getAllBooks();
    res.status(200).send(result);
}))

router.patch('/:id', asyncHandler(async (req, res) => {
    const id = req.params['id'];
    const result = await booksService.updateBook(id, req.body);
    res.status(200).send(result);
}))

module.exports = router;
