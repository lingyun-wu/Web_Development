var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var campgrounds = [
    {name: "Great Smoky Mountain", image:"https://farm4.staticflickr.com/3706/10718494266_56543a9eb7.jpg"},
    {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7512/15558076393_8c1d4b9cf8.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
    {name: "Mountain Goat's Rest", image:"https://farm4.staticflickr.com/3922/15083214895_b0c5cf5e4e.jpg"},
    {name: "Great Smoky Mountain", image:"https://farm4.staticflickr.com/3706/10718494266_56543a9eb7.jpg"},
    {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7512/15558076393_8c1d4b9cf8.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
    {name: "Mountain Goat's Rest", image:"https://farm4.staticflickr.com/3922/15083214895_b0c5cf5e4e.jpg"},
    {name: "Great Smoky Mountain", image:"https://farm4.staticflickr.com/3706/10718494266_56543a9eb7.jpg"},
    {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7512/15558076393_8c1d4b9cf8.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3832/9603531635_e348167e39.jpg"},
    {name: "Mountain Goat's Rest", image:"https://farm4.staticflickr.com/3922/15083214895_b0c5cf5e4e.jpg"}
];

app.get("/", function(req, res) {
    res.render("landing");
});


app.get ("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res) {
   // Get data from form and add to the array 
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   
   res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The YelpCamp server has started!"); 
});