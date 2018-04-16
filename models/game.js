var mongoose = require("mongoose");

var roomUser = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    unoff: String,
    off: String,
    suggestion: String,
    phase: Number
    
});

var gameSchema = new mongoose.Schema({
    name: String,
    password: String,
    playerCount: Number,
    phase: String,
    roomUsers: [roomUser],
    score: [Number]
});


module.exports = mongoose.model("Game", gameSchema);
