const mongoose = require('mongoose');
const Joi = require('joi');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
        
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    cover: {
        type: String,
        required: true,
        enum:["soft cover","hard cover"]
    }
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);

function validateCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(255).required(),
        author: Joi.string().length(24).hex().required(), // Validate as a 24-character hex string (MongoDB ObjectId)
        description: Joi.string().trim().min(10).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft cover","hard cover").required()
    });
    return schema.validate(obj);
}

function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(255),
        author: Joi.string().length(24).hex(), // Optional validation for update
        description: Joi.string().trim().min(10),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft cover","hard cover")
    });
    return schema.validate(obj);
}
module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook
};