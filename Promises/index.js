const express = require("express");
const app = express();
const readFile = require("./promise");

const getData = async () => {
  try {
    const data = await readFile(`${__dirname}/a.txt`);
    console.log(data);
    console.log("3");
  } catch (err) {
    console.log(err, message);
  }
  return "from getData function";
};
console.log("1");
getData()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => console.log(err.message));
console.log("2");
