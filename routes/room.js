var express = require("express"),
    Video   = require('../models/video'),
    Game    = require('../models/game'),
    youtubeUrl              = require('youtube-url'),
    getYoutubeTitle         = require('get-youtube-title'),
    User    = require("../models/user"),
    mongoose = require("mongoose"),
    middleware = require("../middleware"),
    router = express.Router({mergeParams: true});

router.get("/", function(req, res) {
    Video.find({}, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("rooms", { videos: videos});
        }
    });
});

router.post("/", middleware.isAllowed, function(req, res) {
    var roomid = req.body.name;
        res.redirect("/rooms/" + roomid);
    });

router.get("/:id", middleware.isAllowed, function(req, res) {
    var id = req.params.id;
    var linkList = [];
    var list = [];

    Video.find({ roomid: "archive" }, function(err, video) {
        if (err) {
            console.log(err);
            return list;
        }
        else {
            list = video;
            list.forEach(function(video) {
                linkList.push(video.link);
            });

            Video.find({ roomid: id }, function(err, videos, roomidvar) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("index", { videos: videos, roomidvar: id, arcList: linkList});
                }
            });



        }
    });

});

router.post("/:id", function(req, res) {
    var id = req.body.roomidvar;
    var link = req.body.link;
    var playerid = req.body.playerid;
    var username = req.body.username;

    if (youtubeUrl.valid(link)) {

        var url = "https://www.youtube.com/embed/" + youtubeUrl.extractId(link);

        Video.create({
            link: url,
            roomid: id,
            playerid: playerid,
            username: username

        }, function(err, videos) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(videos);
            }
        });
        res.redirect(req.get('referer'));
    }
    else {
        res.redirect(req.get('referer'));
    }
});

router.delete("/:id", function(req,res){
    try{
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
    }
    catch(error){
        Video.remove({roomid: req.body.videoid}, function(err, videos) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(videos);
            }
            
        res.redirect("/game");
        });
    }
        
});




module.exports = router;