const express = require("express");
const morgan = require("morgan");
const PORT = 3000;

const app = express();

const booksRouter = express.Router();

app.use(morgan("dev"));
app.use(express.json());

const getBooksDetails = (req, res) => {
  res.status(200).send("Send all books data");
};

const postBooksDetails = (req, res) => {
  const id = req.params.id;
  res.status(200).send("Books Details created");
};

booksRouter.route("/").get(getBooksDetails);
booksRouter.route("/:id").post(postBooksDetails);

app.use("/api/v1/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}...`);
});
