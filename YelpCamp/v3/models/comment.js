var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    athor: String
});

module.exports = mongoose.model("Comment", commentSchema);