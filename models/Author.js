const mongoose=require("mongoose");
const Joi=require("joi");

const AuthorSchema = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true, minlength:3},
    lastName: {type: String, required: true, trim: true, minlength:3},
    nationality: {type: String, required: true, trim: true, minlength:3},
    image: {type: String, default: "default-image.png"}
});

const Author = mongoose.model("Author", AuthorSchema);

//validate create authors
function validateCreateauthor(obj){
    const schema=Joi.object({
        firstName:Joi.string().trim().min(3).required(),
        lastName:Joi.string().trim().min(3).required(),
        nationality:Joi.string().trim().min(10).required(),
        image:Joi.string()
    })
   return schema.validate(obj);
}
function validateUpdateAuthor(obj){
    const schema=Joi.object({
        firstName:Joi.string().trim().min(3),
        lastName:Joi.string().trim().min(3),
        nationality:Joi.string().trim().min(10),
        image:Joi.string()
    })
   return schema.validate(obj);
}


module.exports = { Author,validateCreateauthor ,validateUpdateAuthor}; // Export the model, not just the schema
