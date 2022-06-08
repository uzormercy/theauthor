const mongoose = require("@app/config/database");
const yup = require("yup");

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: "Title is required" },
    subtitle: { type: String },
    author: { type: String, required: "Author is required" },
    category: String,
    price: { type: Number, default: 0 },
    description: { type: String, default: null },
    item: { type: String, required: true },
    status: { type: Boolean, default: false },
    slug: { type: String, lowercase: true },
  },
  {
    toJSON: {
      transform: (doc, obj) => {
        delete obj.__v;
      },
    },
  }
);

BookSchema.statics.validate = (object) => {
  const schema = yup.object().shape({
    _id: yup.string().required(),
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    category: yup.string().required("Category is required"),
    status: yup.bool().required("Status is required"),
    item: yup.string().required("The file url is required"),
  });
  return schema.validate(object, { strict: true, abortEarly: false });
};
const Book = mongoose.model("book", BookSchema);
module.exports = Book;
