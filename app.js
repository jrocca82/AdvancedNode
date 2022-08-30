const express = require("express"),
	app = express(),
	mongodb = require("mongodb"),
	mongoose = require("mongoose"),
	port = process.env.PORT || 3000,
	myDb =
		"mongodb+srv://loluvulol:VanNuys1@advancednode.ilwpdsp.mongodb.net/?retryWrites=true&w=majority",
	User = require("./Models/user.js"),
	UserRoutes = require("./Controllers/userroutes.js"),
	bodyParser = require("body-parser"),
	ejs = require("ejs"),
	session = require("express-session"),
	passport = require("passport"),
	facebookRoutes = require("./Controllers/authentication.js"),
	facebookAuth = require("./Controllers/facebook.js"),
	key = require("./key.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(myDb);

app.use(session({ secret: key.secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("home");
});

app.use("/auth/facebook", facebookRoutes);

app.get("/profile", (req, res) => {
    if(req.user) {
        res.render("profile", { user: req.user });
    } else if (req.session.user) {
        res.render("profile", { user: req.session.user });
    } else {
        res.redirect("/")
    }
});

app.use("/user", UserRoutes);

app.listen(port, (error) => {
	if (!error) {
		console.log(`Listening on port`, port);
	} else {
		console.log(error);
	}
});
