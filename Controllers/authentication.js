const Router = require("express").Router(),
	passport = require("passport"),
	facebookAuth = require("./facebook.js");

Router.get(
	"/",
	passport.authenticate("facebook", {
		scope: ["public_profile"],
		redirect: "http://www.facebook.com/connect/login_success.html"
	})
);

Router.get("/redirect", passport.authenticate("facebook"), (req, res) => {
	res.redirect("/profile")
});

module.exports = Router;
