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
    ejs= require("ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/profile", (req, res) => {
    let user = {
        name: "Sam",
        img: "https://img.freepik.com/premium-vector/beautiful-fairy-flying-illustration_96037-627.jpg",
        // friends: ["Jo", "Lorenzo", "Jasmin"]
    }
    res.render("profile", {user: user});
});

app.get("/", (req, res) => {
    res.render("home");
});

mongoose.connect(myDb);

app.use("/user", UserRoutes);

app.listen(port, (error) => {
	if (!error) {
		console.log(`Listening on port`, port);
	} else {
		console.log(error);
	}
});
