const express=require("express");
const asyncHandler=require("express-async-handler")
const { Author,validateCreateauthor,validateUpdateAuthor } = require("../models/Author");


const router=express.Router()



//http methods
/**
 *  @desc Get all authors
 *  @route GET /api/authors
 *  @method GET
 *  @access public
 * 
*/
router.get("/",asyncHandler(
    async(req,res)=>{
     const authorsList=await Author.find()
     res.status(200).json(authorsList);
 }));//route handler

/**
 *  @desc Get one author
 *  @route GET /api/authors/:id
 *  @method GET
 *  @access public
 * 
*/
router.get("/:id",asyncHandler(async(req,res)=>{

    const author=await Author.findById(req.params.id)
    if(author){
     res.status(200).json(author)
    }else{
     res.status(404).json({message:"author not fund"})
    }

}));
// router.post();
/**
 *  @desc POST add one author
 *  @route POST /api/authors
 *  @method POST
 *  @access public
 * 
*/
router.post("/",asyncHandler(async(req,res)=>{
    const {error}=validateCreateauthor(req.body)
   if(error){
    return res.status(400).json({message:error.details[0].message})
   }
    
        const author= new Author({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            nationality:req.body.nationality,
            image:req.body.image,
        })
     const result=  await author.save();
    res.status(201).json(result);
   

}))
// router.put();
/**
 *  @desc update  one author
 *  @route put /api/authors/:id
 *  @method PUT
 *  @access public
 * 
*/
router.put("/:id",asyncHandler(async(req,res)=>{
    
    const {error}=validateUpdateAuthor(req.body)
    if(error){
     return res.status(400).json({message:error.details[0].message})
    }

    const author=await Author.findByIdAndUpdate(req.params.id,
        {$set:{
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        image:req.body.image,
     }},{new:true})
    return res.status(200).json(author)


}));

// router.delete();
/**
 *  @desc delete  one author
 *  @route delete /api/authors/:id
 *  @method delete
 *  @access public
 * 
*/
router.delete("/:id",asyncHandler(async(req,res)=>{
    

    const author=await Author.findById(req.params.id)
    if(!author){
        await Author.findByIdAndDelete(author)
     return res.status(404).json({message:"author not fund"})
    }else{
        return res.status(200).json({message:"author has been deleted"})
    }

})); 

module.exports=router
