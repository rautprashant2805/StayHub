const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");

router.route("/signup").get(usersController.renderSignupForm)
.post(wrapAsync(usersController.signup));

router.route("/login").get(usersController.renderLoginForm)
.post(
    saveRedirectUrl, 
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true
    }), 
    usersController.login);

// Logout Route
router.route("/logout").get( usersController.logout);

module.exports = router;