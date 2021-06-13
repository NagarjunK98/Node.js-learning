const fs = require("fs");

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile("a.txt", "utf8", (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};
module.exports = readFile;
