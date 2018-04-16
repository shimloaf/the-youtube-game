// requirements

var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    youtubeUrl              = require('youtube-url'),
    getYoutubeTitle         = require('get-youtube-title'),
    $                       = require('jquery'),
    Video                   = require('./models/video'),
    Game                    = require('./models/game'),
    User                    = require("./models/user"),
    passport                = require("passport"),
    flash                   = require("connect-flash"),
    LocalStrategy           = require("passport-local"),
    schedule = require('node-schedule'),
    passportLocalMongoose   = require("passport-local-mongoose");
    
var roomRoutes = require("./routes/room"),
    archiveRoutes = require("./routes/archive"),
    gameRoomRoutes = require("./routes/gameroom"),
    authRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/yt_game_db");
app.use(express.static("public"));

app.use(require("express-session")({
    secret: "seventeen bazoing glues",
    resave: false,
    saveUninitialized: false
}));




app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(flash());app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.message = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});




app.use("/rooms", roomRoutes);
app.use("/game", gameRoomRoutes);
app.use("/archive", archiveRoutes);
app.use(authRoutes);


app.listen(process.env.PORT, process.env.IP, function() {

    Game.remove({}, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("All Rooms Deleted.");
        }
    });
    
    Video.find({}, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(videos);
            console.log("{------------------------------------}");
            console.log("   Youtube Game server has started!   ");
            console.log("{------------------------------------}");
        }
    });
    
    var removeGamePerHour = schedule.scheduleJob('00 0 * * * *', function(){
      Game.remove({phase:"results"}, function(err, videos) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("All Completed Rooms Deleted.");
        }
    });
    
});
    
    
});



//
// Methods
//
//
//
//




    
