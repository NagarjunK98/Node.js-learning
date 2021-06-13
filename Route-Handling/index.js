const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.json());

const getBooksDetails = (req, res) => {
  res.status(200).send("Send all books data");
};

const postBooksDetails = (req, res) => {
  const id = req.params.id;
  res.status(200).send("Books Details created");
};

app.route("/api/v1/books").get(getBooksDetails);
app.route("/api/v1/books/:id").post(postBooksDetails);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}...`);
});
