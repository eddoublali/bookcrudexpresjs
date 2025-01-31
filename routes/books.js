const express = require("express");
const asyncHandler = require("express-async-handler");
const { Book, validateCreateBook, validateUpdateBook } = require("../models/Book");

const router = express.Router();

/**
 *  @desc Get all books with populated author
 *  @route GET /api/books
 *  @method GET
 *  @access public
*/
router.get("/", asyncHandler(async (req, res) => {
    const booksList = await Book.find().populate('author');
    res.status(200).json(booksList);
}));

/**
 *  @desc Get one book with populated author
 *  @route GET /api/books/:id
 *  @method GET
 *  @access public
*/
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author');
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
}));

/**
 *  @desc POST add one book
 *  @route POST /api/books
 *  @method POST
 *  @access public
*/
router.post("/", asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    });

    const result = await book.save();
    await result.populate('author');
    res.status(201).json(result);
}));

/**
 *  @desc Update one book
 *  @route PUT /api/books/:id
 *  @method PUT
 *  @access public
*/
router.put("/:id", asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    }, { new: true }).populate('author');

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
}));

/**
 *  @desc Delete one book
 *  @route DELETE /api/books/:id
 *  @method DELETE
 *  @access public
*/
router.delete("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    
    return res.status(200).json({ message: "Book has been deleted" });
}));

module.exports = router;