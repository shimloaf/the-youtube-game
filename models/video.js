var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
    link: String,
    roomid: String,
    videoid: Number,
    playerid: String,
    username: String,
    gameName: String

});


module.exports = mongoose.model("Video", videoSchema);