const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique:true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default:false
    },

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).email().required(),
        username: Joi.string().min(2).max(200).required(),
        password: Joi.string().min(6).required(),
        isAdmin: Joi.boolean() 
      
    });
    return schema.validate(obj);
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).email().required(),
        password: Joi.string().min(6).required(),
    
     
    });
    return schema.validate(obj);
}
function validateUpdateUser(obj) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).email(),
        username: Joi.string().min(2).max(200),
        password: Joi.string().min(6),
        isAdmin: Joi.boolean() 
     
    });
    return schema.validate(obj);
}
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
};