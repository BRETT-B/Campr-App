const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        User            = require("./models/user"),
        Campground      = require("./models/campground"),
        Comment         = require("./models/comment"),
        seedDB          = require("./seeds");

//CONNECT TO MONGODB   
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
//APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Go Cubs Go",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seed data for testing/demo
seedDB();

app.get("/", (req, res) => {
    res.render("landing");
});


//INDEX ROUTE
app.get("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

//CREATE ROUTE
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
       if(error){
           console.log(error);
       }else{
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});   
       } 
    });
});

//=======================================
//          COMMENTS ROUTES
//=======================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});
//=================================
//          AUTH ROUTES
//=================================

//show register form
app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => res.redirect("/campgrounds"));
    });
});

//show login form
app.get("/login", (req, res) => res.render("login"));

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});

//logout route to dump user from session
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, () => console.log("Server is listening..."));