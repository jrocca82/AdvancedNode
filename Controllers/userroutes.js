const Router = require("express").Router(),
	User = require("../Models/user.js"),
	bcrypt = require("bcryptjs"),
	salt = bcrypt.genSaltSync(10);

Router.get("/index", (req, res) => {
	User.find({}).exec((error, users) => {
		if (error) {
			res.send(error);
		} else {
			res.send(users);
		}
	});
});

Router.post("/new", (req, res) => {
	let newuser = new User();
	newuser.username = req.body.username;
	newuser.password = bcrypt.hashSync(req.body.password, salt);

	newuser.save((error, user) => {
		if (error) {
			res.send(error);
		} else {
			req.session.user = newuser;
			res.redirect("/profile")
		}
	});
});

Router.post("/login", (req, res) => {
	User.find({
		username: req.body.username
	}), (error, theuser) => {
		if(bcrypt.compareSync(req.body.password, theuser[0].password)) {
			req.session.localUser = theuser;
			res.redirect("/profile");
		}
	}
})

Router.put("/update/:id", (req, res) => {
	User.findById(req.params.id, (error, user) => {
		if (error) {
			res.send(error);
		} else {
			user.username = req.body.username || user.username;
			user.password = req.body.password || user.password;
            user.save((error, user) => {
                if(error) {
                    res.send(error);
                } else {
                    res.send(user);
                }
            })
		}
	});
});

Router.delete("/delete/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, user) => {
        if(error){
            res.send(error);
        } else{
            res.send(user);
        }
    })
})

module.exports = Router;
