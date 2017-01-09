const   Campground  = require("../models/campground"),
        Comment     = require("../models/comment");

const middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            req.flash("error", "Oh snap...we couldn't find that campground!")
            res.redirect("back");
        }else{
            //does the user own the campground
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "Sorry, you don't have permission to do that.");
                res.redirect("back");
            }
        }
    });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect("back");
            }else{
            //does the user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "Sorry, you don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Oops! You must login first.");
    res.redirect("/login");
};

module.exports = middlewareObj;