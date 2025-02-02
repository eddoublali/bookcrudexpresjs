const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    User,
    validateRegisterUser,
    validateLoginUser
} = require("../models/User");

const router = express.Router();

/**
 *  @desc POST register new user
 *  @route POST /api/auth/register
 *  @method POST
 *  @access public
 */
router.post('/register', asyncHandler(
    async (req, res) => {
        // 1. Validate the request body
        const { error } = validateRegisterUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // 4. Create new user with hashed password
        user = new User({
            email: req.body.email,
            username: req.body.username,
            password:  req.body.password,  // Use the hashed password
            isAdmin: req.body.isAdmin
        });

        // 5. Save user and send response
        const result = await user.save();
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY);
        // 6. Remove password from response
        const { password, ...other } = result._doc;
        res.status(201).json({...other,token});
    }
));
/**
 *  @desc POST login  user
 *  @route POST /api/auth/login
 *  @method POST
 *  @access public
 */
router.post('/login', asyncHandler(
    async (req, res) => {
        // 1. Validate the request body
        const { error } = validateLoginUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        // 3. check if  the password match the current
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "invalid email or password" });
        }
      

        // 5. Save user and send response

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY);
        // 6. Remove password from response
        const { password, ...other } = user._doc;
        res.status(200).json({...other,token});
    }
));

module.exports = router;