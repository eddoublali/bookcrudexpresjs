const express=require("express");
const booksPath=require("./routes/books");
const authorsPath=require("./routes/authors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();
// connect to mongodb
connectDB();
//init app
const app=express();
//apply middlewares
app.use(express.json());

//use routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
const PORT=process.env.PORT||4000;
app.listen(PORT,()=>console.log(`server listening on port ${PORT}`));