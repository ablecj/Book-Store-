import express from 'express';
import { Books } from '../models/bookModel.js';

const router = express.Router();

// Route for save a new Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Books.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get All Books from database
router.get("/", async (req, res) => {
  try {
    const books = await Books.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get One Books from database id details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for update a book
router.put("/:id", async (req, res) => {
  try {
    if ((!req.body.title, !req.body.author, !req.body.publishYear)) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear !",
      });
    }

    const { id } = req.params;

    const result = await Books.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found !" });
    }

    return res.status(200).send({ message: "Book updated Sucessfuly !" });
  } catch (error) {
    console.log("Error", error.message);
  }
});

// Route for Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Books.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found !" });
    }

    return res.status(200).send({ message: "Books Deleted Successfuly !" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;