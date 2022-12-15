const express = require("express");
require('dotenv').config(); 
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const PORT = process.env.PORT

const items = ["Buy Food", "Cook Food"];
const workItems = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    let day = date.getDate()
  res.render("list", { listTitle: day, newListItems: items });
});
app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.get("/about", function(req, res){
    res.render("about")
})
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});
app.post("/work", function (req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/work");
});

app.listen(PORT, function () {
  console.log(`server started at port: ${PORT}`);
});
