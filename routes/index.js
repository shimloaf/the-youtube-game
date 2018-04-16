var express = require("express"),
    Video = require('../models/video'),
    youtubeUrl = require('youtube-url'),
    getYoutubeTitle = require('get-youtube-title'),
    Game = require('../models/game'),
    User = require("../models/user"),
    RoomUser = require("../models/roomUser"),
    passport = require("passport"),
    middleware = require("../middleware"),
    router = express.Router({ mergeParams: true });

router.get("/profile", middleware.isLoggedIn, function(req, res) {
    Video.find({ playerid: req.user._id }, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else
            res.render("profile", { videos: videos, user: req.user.username });

    });
});

router.get("/register", function(req, res) {
    res.render("register", { exError: "no" });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/game/menu",
    failureRedirect: "/login",
    failureFlash: true

}), function(req, res) {});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/game/menu");
});

router.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message + ".");
            return res.render("register");
        }
        req.flash("success", "Welcome to the Youtube Game, " + user.username + "!");
        passport.authenticate("local")(req, res, function() {
            res.redirect("/profile");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});


router.delete("/profile", middleware.isLoggedIn, function(req, res) {

    //check if in any active rooms

    var isInRoom = false;
    var roomPhase = false;
    Game.find({}, function(err, games) {
        if (err) {
            console.log(err);
        }
        else {
            games.forEach(function(game) {
                game.roomUsers.forEach(function(user) {
                    if (user.username === req.user.username) {
                        isInRoom = true;
                        if (user.phase > 1) {
                            roomPhase = true;
                        }

                    }
                });
            });

            if (isInRoom === true) {
                if (roomPhase === true) {

                    // scrub names from all videos

                    Video.updateMany({ playerid: req.user._id }, { username: "", playerid: "" }, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });

                    //delete user
                    User.findByIdAndRemove(req.user._id, function(err, user) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(user + "removed");
                            
                        }//logout
                            req.flash("error", "Sorry to see you go!");

                    });


                }
                else {
                    req.flash("error", "You can't delete your account while a game is in progress!");
                }
            }
            else {
                // scrub names from all videos

                Video.updateMany({ playerid: req.user._id }, { username: "", playerid: "" }, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

                //delete user
                User.findByIdAndRemove(req.user._id, function(err, user) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(user + "removed");

                    }                        //logout
                        req.flash("error", "Sorry to see you go!");

                });


            }
        }
    });




});



router.get("/", function(req, res) {
    Video.find({}, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("home", { videos: videos });
        }
    });
});

router.get("*", function(req, res) {
    res.send("four oh foru");
});


module.exports = router;
