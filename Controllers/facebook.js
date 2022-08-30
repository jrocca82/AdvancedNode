const passport = require("passport"),
	facebookStrategy = require("passport-facebook"),
	key = require("../key"),
	User = require("../Models/user.js");

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
	new facebookStrategy(
		{
			clientID: key.facebook.client_id,
			clientSecret: key.facebook.client_secret,
			callbackUrl: "https://www.facebook.com/connect/login_success.html",
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ facebookid: profile.id }).then((currentUser) => {
				if (currentUser) {
					done(null, currentUser);
				} else {
					let newuser = new User();
					newuser.username = profile.displayName;
					newuser.facebookid = profile.id;
					newuser.save().then((thenewuser) => {
						done(null, thenewuser);
					});
				}
			});
		}
	)
);
