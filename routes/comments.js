const   express     = require("express"),
        router      = express.Router({mergeParams: true}),
        Campground  = require("../models/campground"),
        Comment     = require("../models/comment"),
        middleware  = require("../middleware");
        
//comments NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//comments CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    req.flash("error", "Something went wrong creating your comment");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save()
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Awesome! Thanks for posting a comment.")
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//comments EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwner, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
       if(err){
           res.redirect("back");
       }else{
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});

//comments UPDATE
router.put("/:comment_id", middleware.checkCommentOwner, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//comments DELETE
router.delete("/:comment_id", middleware.checkCommentOwner, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, removedComment) => {
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Successfully removed your comment.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;