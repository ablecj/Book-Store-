import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Books } from "./models/bookModel.js";

const app = express();

// adding middlewares for parsing request body
app.use(express.json());

// routes adding
app.get("/", (req, res) => {
  console.log(req, "req");
  return res.status(200).send("Welcome To Mern Stack Tutorial !");
});

// Route for save a new Book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({
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
app.get('/books', async(req,res)=>{
    try {
        const books = await Books.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log("error",error.message);
        res.status(500).send({message: error.message})
    }
})

// Route for get One Books from database id
app.get('/books/:id', async(req,res)=>{
    try {

        const {id} = req.params;

        const book = await Books.findById(id)

        return res.status(200).json(book)
    } catch (error) {
        console.log("error",error.message);
        res.status(500).send({message: error.message})
    }
})

// Route for update a book
app.put('/books/:id', async(req,res)=>{
    try {
        if(
            !req.body.title,
            !req.body.author,
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear !"
            })
        }

        const {id} = req.params;

        const result = await Books.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: "Book not found !"});
        };

        return res.status(200).send({message: "Book updated Sucessfuly !"}); 
    } catch (error) {
        console.log("Error",error.message);
    }
})

// Route for Delete a book
app.delete('/books/:id',async(req, res)=>{
    try {
        const {id} = req.params;

        const result = await Books.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Book not found !'});
        }

        return res.status(200).send({message: "Books Deleted Successfuly !"})
        
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send({message: error.message});
    }
})

// mongoose connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });
