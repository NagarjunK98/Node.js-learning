const express = require("express");
const morgan = require("morgan");
const Books = require("./db");

const PORT = 3000;

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./../config.env" }); // Create a file called config.env and specify database url string

app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  const { name, rating, description } = req.query;
  const input = new Books({
    name: name,
    rating: rating,
    description: description,
  });

  input
    .save()
    .then((doc) => {
      console.log("Inserted document", doc._id);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(name, rating, description);
  res.send(name, rating, description);
});

app.listen(PORT, console.log(`Express running on ${PORT}..`));
