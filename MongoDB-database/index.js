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
    res.status(400).send("Data not in correct format");
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

const getBookDetails = async (req, res) => {
  try {
    const name = req.query.name;
    const result = await Books.find({ name: name });
    if (result.length > 0) {
      res.status(200).send({ data: result });
    } else {
      res.status(200).send("Data not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateBookDetails = async (req, res) => {
  try {
    const status = await Books.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(status);
    res.status(200).send("Updated Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteBookDetails = async (req, res) => {
  try {
    const status = await Books.findByIdAndDelete(req.query.id);
    if (status) {
      res.status(200).send("Deleted Successfully");
    } else {
      res.status(404).send("Details not found to delete");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

booksRouter
  .route("/books")
  .get(getBookDetails)
  .post(checkData, postBookDetails)
  .patch(updateBookDetails)
  .delete(deleteBookDetails);

app.use("/api/v1/db", booksRouter);

app.listen(PORT, console.log(`Express running on ${PORT}..`));
