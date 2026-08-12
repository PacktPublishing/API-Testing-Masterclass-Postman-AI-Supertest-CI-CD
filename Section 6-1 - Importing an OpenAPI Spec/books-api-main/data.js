const books = [
  { id: 1, title: "Clean Code", author: "Robert Martin" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
];

let nextId = 3;

function getNextId() {
  return nextId++;
}

module.exports = { books, getNextId };
