var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

router.get ("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});


router.post("/", function(req, res) {
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


router.get("/new", function(req, res) {
   res.render("campgrounds/new"); 
});



router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});


module.exports = router;
