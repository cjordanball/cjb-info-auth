const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');

const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
	User.findOne({ username })
	.then((user) => {
		if (!user) {
			return done(null, false);
		}
		// compare passwords
		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
	.catch(err => done(err));
});


passport.use(localLogin);
