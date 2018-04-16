
var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

middlewareObj.isAllowed = function isAllowed(req, res, next) {
    
    var roomid = req.body.name;
    var urlE = false;
    
    if(roomid === undefined){
        urlE = true;
        roomid = req.params.id;
    }
    
    if(roomid === ""){
        req.flash("error", "Room name must not be blank!");
        res.redirect("/rooms");
        
    }
    else if(roomid.indexOf("停") > -1 && urlE === false){
        req.flash("error", "Room name must not contain reserved characters!");
        res.redirect("/rooms");
    }
    else if(roomid.length > 21 && roomid.indexOf("停") === -1){
        req.flash("error", "Room name must be shorter than 21 characters!");
        res.redirect("/rooms");
    }
    else{
        return next();
    }
}

module.exports = middlewareObj;