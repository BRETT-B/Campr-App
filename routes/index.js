const   express     = require("express"),
        passport    = require("passport"),
        User        = require("../models/user"),
        router      = express.Router();

//ROOT ROUTE
router.get("/", (req, res) => {
    res.render("landing");
});
//=================================
//          AUTH ROUTES
//=================================

//show register form
router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
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
router.get("/login", (req, res) => res.render("login"));

//handles the login form logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});

//logout route to dump user from session
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;