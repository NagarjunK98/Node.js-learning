const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./../config.env" }); // Create a file called config.env and specify database url string

// Read environment variables
DATABASE_LOCAL = process.env.DATABASE_LOCAL;
DATABASE_REMOTE = process.env.DATABASE_REMOTE;

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
    console.log("Successfully connected to mongodb cluster");
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
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// Document Middleware
bookSchema.pre("save", function (next) {
  this.duration = Date.now();
  next();
});

bookSchema.post("save", function (doc, next) {
  console.log(
    "Took took to create document " +
      (Date.now() - this.duration) +
      " Milliseconds"
  );
  next();
});

// Create a model
const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
