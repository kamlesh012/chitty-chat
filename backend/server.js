//Standard/Default JavaScript ECMA Script import/export .

// import express from "express";
// import { chats } from "./data/data.js";
// must add this in package.json under after author-> "type":"module",
// before importing file extension is must

//CommonJS modules used by default in react.
const express = require("express");
// const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); //to accept Json data
//app.use is a middleware that will be executed everytime request is accepted.
//express.json will parse data to json & add to request.body.
// app.use(bodyParser.json({ limit: "10mb" }));
app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", userRoutes);

app.use(notFound);

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   console.log(req);
//   const SingleChat = chats.find((c) => c._id == req.params.id);
//   res.send(SingleChat);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Started Server! ${PORT}`));
