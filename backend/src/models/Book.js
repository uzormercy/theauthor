const mongoose = require("@app/config/database");

const { Schema } = mongoose;

const BookSchema = new Schema({
  _id: { type: String },
  title: { type: String, required: "Title is required" },
  subtitle: { type: String },
  author: { type: String, required: "Author is required" },
  category: String,
  price: { type: Number, default: 0 },
  description: { type: String, default: null },
  item: { type: String, required: true, trim: true },
  status: { type: Boolean, default: false },
  slug: { type: String, lowercase: true },
});

BookSchema.methods.toJSON = () => this.toObject({ versionKey: false });
const Book = mongoose.model("book", BookSchema);
module.exports = Book;
