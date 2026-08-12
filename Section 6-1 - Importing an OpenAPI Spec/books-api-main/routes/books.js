const express = require("express");
const router = express.Router();
const { books, getNextId } = require("../data");

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get("/", (req, res) => {
  res.json(books);
});

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: A single book
 *       404:
 *         description: Book not found
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Missing title or author
 */
router.post("/", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  const newBook = { id: getNextId(), title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *       404:
 *         description: Book not found
 */
router.put("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       204:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete("/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });
  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
