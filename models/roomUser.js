var mongoose = require("mongoose");

var roomUserSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    unoff: String,
    off: String,
    suggestion: String,
    phase: Number

});


module.exports = mongoose.model("RoomUser", roomUserSchema);