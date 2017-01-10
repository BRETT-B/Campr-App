const   express     = require("express"),
        router      = express.Router(),
        Campground  = require("../models/campground"),
        middleware  = require("../middleware");
    

//INDEX ROUTE
router.get("/", (req, res) => {
    
    //get all campgrounds from db
    Campground.find({}, (error, allCampgrounds) => {
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//NEW ROUTE...DISPLAY FORM
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, (req, res) => {
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, price: price, image: image, description: description, author: author};
    //   create a new campground and save to db
    Campground.create(newCampground, (error, addedCampground) => {
        if(error){
            console.log(error);
        }else{
            console.log("Campground added: " + addedCampground);
            req.flash("success", "Thanks " + req.user.username + "! " + addedCampground.name + " was added.");
            res.redirect("/campgrounds");
        }
    });
});

//SHOW ROUTE .. FIND CAMPGROUND WITH PARTICULAR ID
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
       if(error){
           console.log(error);
       }else{
           res.render("campgrounds/show", {campground: foundCampground});   
       } 
    });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwner, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwner, (req, res) => {
    //find and update the campground, then redirect
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);     
        }
    });
});

//DELETE ROUTE
router.delete("/:id", middleware.checkCampgroundOwner, (req, res) => {
   Campground.findByIdAndRemove(req.params.id, (err, removedCampground) => {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           console.log("Deleted " + removedCampground.name);
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;
