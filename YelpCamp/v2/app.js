var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Great Smoky Mountain", 
//         image:"https://farm4.staticflickr.com/3706/10718494266_56543a9eb7.jpg",
//         description: "LALALA"
//     }, 
//     function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });



app.get("/", function(req, res) {
    res.render("landing");
});


app.get ("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
       if (err) {
           console.log(err);
       } else {
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
});


app.post("/campgrounds", function(req, res) {
   // Get data from form and add to the array 
   var name = req.body.name;
   var image = req.body.image;
   var descr = req.body.description;
   var newCampground = {name: name, image: image, description: descr};
   // Create a new campground and save it to DB
   Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
          console.log(err);
      } else {
          res.redirect("/campgrounds");
      }
   });
});


app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});



app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The YelpCamp server has started!"); 
});