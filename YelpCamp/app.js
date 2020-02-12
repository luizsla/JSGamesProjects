//YelpCamp Application.
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

//Setting up view engine to be ejs.
app.set("view engine", "ejs");

//Setting up body-parser to be listening to post requests.
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
  res.render("index", {title: "Home"});
});

app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {
      name: "Mandiroba",
      picture: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"
    },
    {
      name: "Deserto",
      picture: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906_960_720.jpg"
    },
    {
      name: "Fazenda",
      picture: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_960_720.jpg"
    }
  ]

  res.render("campgrounds", {campgrounds: campgrounds, title: "Campgrounds"});
});


app.get("/campgrounds/add", function(req, res) {
  res.render("campgrounds-add", {title: "Add a new campground"});
});

app.post("/campgrounds", function(req, res) {
  res.redirect("/campgrounds");
});






app.listen(3000, function() {
  console.log("Server Running");
});
