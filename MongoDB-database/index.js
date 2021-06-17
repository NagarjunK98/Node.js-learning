const express = require("express");
const morgan = require("morgan");
const Books = require("./db");

const PORT = 3000;

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./../config.env" }); // Create a file called config.env and specify database url string

app = express();

const booksRouter = express.Router();

app.use(morgan("dev"));
app.use(express.json());

const checkData = (req, res, next) => {
  if (req.body.name && req.body.rating) {
    next();
  } else {
    res.send("Data not in correct format");
  }
};
const postBookDetails = async (req, res) => {
  try {
    const result = await Books.create(req.body);
    res.send({ status: "Inserted document", id: result._id });
  } catch (err) {
    console.log(err.message);
  }
};

booksRouter.route("/books").post(checkData, postBookDetails);

app.use("/api/v1/db", booksRouter);

app.listen(PORT, console.log(`Express running on ${PORT}..`));
