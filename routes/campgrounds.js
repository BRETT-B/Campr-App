const   express     = require("express"),
        router      = express.Router(),
        Campground  = require("../models/campground");
    

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
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/", (req, res) => {
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newCampground = {name: name, image: image, description: description};
    //   create a new campground and save to db
    Campground.create(newCampground, (error, addedCampground) => {
        if(error){
            console.log(error);
        }else{
            console.log("Campground added");
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
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});   
       } 
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
