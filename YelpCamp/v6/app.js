var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

seedDB();
mongoose.connect('mongodb://localhost/yelp_camp_v6', { useMongoClient: true });
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


// Passport configuration
app.use(require("express-session")({
    secret: "LALALALALALLALA",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});




app.get("/", function(req, res) {
    res.render("landing");
});


app.get ("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
   res.render("campgrounds/new"); 
});



app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});




// ============================================
//  COMMENT ROUTES
// ============================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });

});



app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
   //look up campground using id
   Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment) {
               if (err) {
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
           })
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect to campground show page
   
});






//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}






app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The YelpCamp server has started!"); 
});