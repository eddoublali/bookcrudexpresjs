const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require('./routes/auth');

const usersPath = require('./routes/users');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');

const { notFound, errorHandler }= require('./middlewares/errors');

const connectDB = require('./db');

dotenv.config();
// connect to mongodb
connectDB();

//init app
const app = express();

//apply middlewares
app.use(express.json());
app.use(logger);

//use routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);
app.use("/api/users", usersPath);

//error handler middleware
app.use(notFound);    // Use the function directly
app.use(errorHandler); // Use the function directly

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));