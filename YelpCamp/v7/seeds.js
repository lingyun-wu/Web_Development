var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "LALA",
        image: "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg",
        description: "HAHA"
    },
    {
        name: "JAJA",
        image: "https://farm5.staticflickr.com/4150/4832531195_9a9934b372.jpg",
        description: "HAHA"
    },
    {
        name: "SASA",
        image: "https://farm5.staticflickr.com/4100/4798314980_bc31231984.jpg",
        description: "HAHA"
    }
    ];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Remove all campgrounds!");
             //Add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Add a campground");
                    Comment.create({
                        text: "This is a great place",
                        author: "Homer"
                    }, function(err, comment) {
                       if (err) {
                           console.log(err);
                       } else {
                           campground.comments.push(comment);
                           campground.save();
                           console.log("Created a new comment");
                       }
                    });
                }
            }); 
        });
        }
    });
    
   

    //Add a few comments
    
};


module.exports = seedDB;

