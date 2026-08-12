const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Books route working", books: [] });
});

module.exports = router;
