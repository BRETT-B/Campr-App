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
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome Campr! " + user.username + " was successfully registered.");
            res.redirect("/campgrounds");
        });
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
    req.flash("success", "Successfully logged out");
    res.redirect("/campgrounds");
});

module.exports = router;