const express = require("express");
const router = express.Router();

const BookApi = require("@app/apis/admin/books");

router.post("/books/create", BookApi.store);

module.exports = router;
