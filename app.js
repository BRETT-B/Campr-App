const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        methodOverride  = require("method-override"),
        flash           = require("connect-flash"),
        LocalStrategy   = require("passport-local"),
        User            = require("./models/user"),
        Campground      = require("./models/campground"),
        Comment         = require("./models/comment"),
        seedDB          = require("./seeds");
        
//REQUIRING ROUTES      
const   campgroundRoutes    = require("./routes/campgrounds"),
        commentRoutes       = require("./routes/comments"),
        authRoutes          = require("./routes/index"); 

//CONNECT TO MONGODB   
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;

//APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
//middleware to pass info on every route
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//seed data for testing/demo
// seedDB();

app.listen(process.env.PORT, process.env.IP, () => console.log("Server is listening..."));