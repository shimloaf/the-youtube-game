var express = require("express"),
    Video   = require('../models/video'),
    
    youtubeUrl              = require('youtube-url'),
    getYoutubeTitle         = require('get-youtube-title'),
    Game    = require('../models/game'),
    User    = require("../models/user"),
    middleware = require("../middleware"),
    mongoose = require("mongoose");
var router = express.Router({mergeParams: true});


router.get("/", function(req, res) {
    Video.find({ roomid: "archive" }, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("archive", { videos: videos });
        }
    });
});

router.get("/all", function(req, res) {
    Video.find({}, function(err, videos, roomDis) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("subarchive", { videos: videos, roomDis: false });
        }
    });
});

router.get("/submit", function(req, res) {
    res.render("submit");
});


router.get("/game", function(req, res){
   Video.find({}, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("gamearchive", { videos: videos });
        }
    }); 
});


router.get("/rooms", function(req, res) {
    Video.find({}, function(err, videos, roomDis) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("subarchive", { videos: videos, roomDis: true });
        }
    });
});

router.post("/", function(req, res) {
    var link = req.body.link;

     if (youtubeUrl.valid(link)) {

        var url = "https://www.youtube.com/embed/" + youtubeUrl.extractId(link);

        Video.create({
            link: url,
            roomid: "archive"
        }, function(err, videos) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(videos);
            }
        });
        res.redirect("/archive");
    }
    else {
        res.redirect(req.get('referer'));
    }
});


router.delete("/:id", function(req,res){
        var vidid = mongoose.Types.ObjectId(req.body.videoid);
        Video.findByIdAndRemove(vidid, function(err, videos) {
            if (err) {
                console.log(err);
                res.redirect(req.get('referer'));
            }
            else {
                console.log(videos);
            }
        });
        res.redirect(req.get('referer'));
});



function isAllowed(id) {
    if (id !== "")
        return true;
    else
        return false;
}


module.exports = router;