var express = require("express"),
    Video = require('../models/video'),
    Game = require('../models/game'),
    RoomUser = require("../models/roomUser"),
    mongoose = require("mongoose"),
    youtubeUrl = require('youtube-url'),
    getYoutubeTitle = require('get-youtube-title'),
    ObjectId = require('mongoose').Types.ObjectId,
    middleware = require("../middleware"),
    User = require("../models/user");
var router = express.Router({ mergeParams: true });

router.get("/menu", function(req, res) {
    res.render("gameroom", { message: req.flash("error") });
});

router.get("/", middleware.isLoggedIn, function(req, res) {
    Game.find({}, function(err, games) {
        if (err) {
            console.log(err);
        }
        else {
            if (games.length > 0)
                res.render("gameindex", { games: games });
            else
                res.render("gamecreate");

        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    var nam3 = req.body.gameId;
    Game.find({ name: nam3 }, function(err, game) {
        if (err) {
            console.log(err);
        }
        else {
            if (game[0].password === req.body.password) {
                res.redirect("/game/" + game[0]._id);
            }
            else {
                res.redirect("/game/menu/");
            }
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("gamecreate");
});

router.post("/new", middleware.isLoggedIn, function(req, res) {
    Game.find({ name: req.body.gameName }, function(err, game) {
        if (err)
            console.log(err);
        else if (game.length === 0) {
            Game.create({
                name: req.body.gameName,
                password: req.body.password,
                playerCount: req.body.players,
                roomUsers: [],
                phase: "init",
                score: [0, 0, 0, 0, 0, 0]

            }, function(err, videos) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(videos);
                }
            });

            res.redirect("/game/");
        }
        else {
            res.redirect("/game/new");
        }
    });
});

router.post("/:id", middleware.isLoggedIn, function(req, res) {
    Game.findById(req.body.gameId, function(err, game) {
        if (err) {
            console.log(err);
        }
        else {
            for (var n = 0; n < game.roomUsers.length; n++) {
                if (game.roomUsers[n].id + "" === req.body.userId) { //find the room user that matches the real user who made the post request
                    if (req.body.offUnOff === "Official" && youtubeUrl.valid(req.body.link)) {
                        game.roomUsers[n].off = "https://www.youtube.com/embed/" + youtubeUrl.extractId(req.body.link);
                    }
                    else if (req.body.offUnOff === "Unofficial" && youtubeUrl.valid(req.body.link)) {
                        game.roomUsers[n].unoff = "https://www.youtube.com/embed/" + youtubeUrl.extractId(req.body.link);
                    }
                    else if (req.body.offUnOff === "suggComplex" || req.body.offUnOff === "suggSimple") {
                        game.roomUsers[n].suggestion = req.body.suggestion;
                    }
                    else if (req.body.offUnOff === "suggCustom") {
                        game.roomUsers[n].suggestion = req.body.customPrompt;
                    }
                    else if (req.body.offUnOff === "OfficialU") {
                        game.roomUsers[n].off = undefined;
                    }
                    else if (req.body.offUnOff === "UnofficialU") {
                        game.roomUsers[n].unoff = undefined;
                    }
                    else if (req.body.offUnOff === "lockerBOYS") {
                        game.roomUsers[n].phase = 1; //1 means locked in
                        var lockedIn = 0;
                        game.roomUsers.forEach(function(user) {
                            if (user.phase === 1) {
                                lockedIn++;
                            }
                            if (lockedIn === game.playerCount) {
                                game.phase = "vote";
                            }
                        });
                    }
                    else if (req.body.offUnOff === "voted") {
                        console.log("PASSED");
                        game.roomUsers[n].phase = 2; // 2 means has voted

                        for (var n = 0; n < 5; n++) { //this will update total score
                            game.score[n] = (parseInt(game.score[n], 10) + parseInt(req.body.votedata[n], 10));
                            console.log(game.score[n] + "|" + (parseInt(game.score[n], 10) + "|" + parseInt(req.body.votedata[n], 10)))
                        }
                        game.score = game.score.slice(0, game.playerCount);
                        var voted = 0; //this will see if all players have voted
                        game.roomUsers.forEach(function(user) {
                            if (user.phase === 2) {
                                voted++;
                            }
                        });

                        if (voted === game.playerCount) {
                            game.phase = "results";

                            var winner = 0,
                                tied = 0,
                                score = game.score[0];
                            for (var n = 0; n < game.score.length; n++) {
                                if (parseInt(game.score[n]) > score) {
                                    score = game.score[n];
                                    winner = n;
                                }
                                else if (parseInt(game.score[n] === score)) {
                                    tied++;
                                }
                            }

                            if (tied === game.score.length) {
                                game.score[Math.round(Math.random() * game.score.length - 1)] = 2147483647;
                            }

                            var winnername = game.roomUsers[winner];
                            console.log(winnername);
                            game.roomUsers.forEach(function(user) {

                                if (winnername === user.username) {
                                    Video.create({
                                        link: user.off,
                                        roomid: "停" + req.body.gameId,
                                        playerid: user.id,
                                        username: user.username + "the Winner!",
                                        gameName: req.body.name

                                    }, function(err, videos) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log("Video created for Archive")
                                            console.log(videos);
                                        }

                                    });
                                }
                                else {
                                    Video.create({
                                        link: user.off,
                                        roomid: "停" + req.body.gameId,
                                        playerid: user.id,
                                        username: user.username,
                                        gameName: req.body.name

                                    }, function(err, videos) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {

                                            console.log(videos);
                                        }

                                    });
                                }
                                if (user.unoff) {
                                    Video.create({
                                        link: user.unoff,
                                        roomid: "停" + req.body.gameId,
                                        playerid: user.id,
                                        username: user.username,
                                        gameName: req.body.name

                                    }, function(err, videos) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log(videos);
                                        }

                                    });
                                }


                            });

                        }




                    }





                }
            }

            game.save(function(err, newGame) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(newGame);
                    res.redirect("/game/" + req.body.gameId);
                }

            });
        }
    });
});


router.get("/:id", middleware.isLoggedIn, function(req, res) {

    if (ObjectId.isValid(req.params.id)) {
        Game.findById(req.params.id, function(err, games) {
            if (err) {
                console.log(err);
            }
            else if (games !== null) {

                var roomIsFull = (games.roomUsers.length === games.playerCount);

                var playerInRoom = false;

                for (var n = 0; n < games.roomUsers.length; n++) {
                    if (req.user._id + "" === games.roomUsers[n].id + "") {
                        playerInRoom = true;
                    }
                }
                if (!roomIsFull && !playerInRoom) { //not full not in

                    RoomUser.create({ phase: 0 }, function(err, theUser) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            theUser.username = req.user.username;
                            theUser.id = req.user._id;
                            games.roomUsers.push(theUser);
                            games.save(function(err, newGame) {

                                console.log(newGame);
                                if (err) console.log(err);
                                else
                                    res.render("game", { games: newGame });
                            });
                        }

                    });
                }
                else if (!roomIsFull && playerInRoom) { //room not full but player is in
                    res.render("game", { games: games });
                }
                else if (roomIsFull && playerInRoom) { // room full but player is in room
                    res.render("game", { games: games });
                }
                else //room full user not in room
                {
                    req.flash("error", "Sorry, that room is full.");
                    res.redirect("/game");
                }
            }
            else {
                res.redirect("/");
            }
        });
    }
    else {
        res.redirect("/");
    }
});


router.get("/:id/vote", middleware.isLoggedIn, function(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        Game.findById(req.params.id, function(err, games) {
            if (err) {
                console.log(err);
            }
            else {
                var playerInRoom = false;
                for (var n = 0; n < games.roomUsers.length; n++) {
                    if (req.user._id + "" === games.roomUsers[n].id + "") {
                        playerInRoom = true;
                    }
                }
                if (playerInRoom && games.phase === "vote") {
                    res.render("vote", { games: games });
                }
                else {
                    console.log("playerInRoom=" + playerInRoom + " game phase:" + games.phase);
                    res.redirect("/");
                }
            }
        });
    }
    else {
        res.redirect("*");
    }
});

router.get("/validate", function(req, res) {
    res.redirect(req.get('referer'));
});




module.exports = router;
