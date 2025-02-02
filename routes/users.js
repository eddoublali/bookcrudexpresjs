const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");


const  verifyToken = require("../middlewares/verifyToken");
const router = express.Router();
const {
    User,
    validateUpdateUser
} = require("../models/User");



/**
 *  @desc Updat  user
 *  @route POST /api/users/:id
 *  @method POST
 *  @access public
 */
router.post('/:id',verifyToken, asyncHandler(
    async (req, res) => {
        const { error } = validateUpdateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        
      if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
        
        const upadtUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            $set:{
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
               
            }
         },{new:true}).select("-password");
         return res.status(200).json(upadtUser)
         }));
   

module.exports = router;