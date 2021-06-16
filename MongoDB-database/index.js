const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./../config.env" }); // Create a file called config.env and specify database url string

// Read environment variables
DATABASE_LOCAL = process.env.DATABASE_LOCAL;
DATABASE_REMOTE = process.env.DATABASE_REMOTE;
const PORT = 3000;

const DB = DATABASE_REMOTE;

// Connect to remote hosted mongodb cluster
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("Database Connection success full");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Define Schema for database
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A book name is required"],
  },
  rating: {
    type: float,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

// Create a model
const Books = mongoose.model("Books", bookSchema);

app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Successfully connect to remote mongodb database");
});

app.listen(PORT, console.log(`Express running on ${PORT}..`));
