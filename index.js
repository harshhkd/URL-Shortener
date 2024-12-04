const express = require("express");

const URL = require("./models/url");
const path = require("path");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const { connectMongoDb } = require("./connect");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(PORT, () => console.log(`Severs Started at PORT :${8001}`));
