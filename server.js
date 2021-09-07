require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/blog");

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.listen(PORT);
