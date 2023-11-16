import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Books } from "./models/bookModel.js";
import bookRoutes from './Routes/booksRoutes.js';
import cors from 'cors';

const app = express();

// adding middlewares for parsing request body
app.use(express.json());

// MIDDLEWARE FOR HANDLING CORS POLICY
app.use(cors());
// app.use(
//     cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// })
// );


// routes adding
app.get("/", (req, res) => {
  console.log(req, "req");
  return res.status(200).send("Welcome To Mern Stack Tutorial !");
});

app.use('/books',bookRoutes);


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
