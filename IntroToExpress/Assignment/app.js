var express = require("express");

var app = express();


app.get("/", function(req, res) {
   res.send("Hi there, welcome to my assignment!") 
});


app.get("/pig", function(req, res) {
   res.send("The pig says 'Oink'"); 
});


app.get("/cow", function(req, res) {
   res.send("The cow says 'Moo'"); 
});


app.get("/dog", function(req, res) {
   res.send("The dog says 'Woof Woof!'"); 
});


app.get("/repeat/:word/:num", function(req, res) {
   var w = req.params.word;
   var n = Number(req.params.num);
   var ans = "";
   for (var i = 0; i < n; ++i) {
       ans += w + " ";
   }
   
   res.send(ans);
});


app.get("*", function(req, res) {
    res.send("Sorry, the page not found...What are you doing with your life?");    
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Sever has started!"); 
});
