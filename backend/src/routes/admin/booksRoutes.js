const express = require("express");
const router = express.Router();

const BookApi = require("@app/apis/admin/books");

router.post("/book/create", BookApi.store);

module.exports = router;
