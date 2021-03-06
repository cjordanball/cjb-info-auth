const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const secrets = require('../config/secrets');
const User = require('../models/users');

mongoose.Promises = global.Promises;

const tokenForUser = (user) => {
	const timestamp = new Date().getTime();
	return jwt.encode({
		sub: user.id,
		iat: timestamp
	}, secrets.JWT_PASSPHRASE);
};

const signup = (req, res, next) => {
	console.log('in signup');
	if (!req.body.username || !req.body.password) {
		res.status(422).send({ error: 'Must submit a username and password!' });
	}
	const username = req.body.username.toLowerCase();
	const password = req.body.password;
	const email = req.body.email ? req.body.email.toLowerCase() : null;

	User.findOne({ username })
	.then((user) => {
		if (user) {
			return res.status(422).send({ error: 'Username is taken.' });
		}
		const newUser = new User({ username, email, password });
		newUser.save()
		.then(() => {
			res.status(200)
			.json({ token: tokenForUser(newUser) });
		})
		.catch(err => next(err));
	});
};

const signin = (req, res) => {
	console.log(req.user);
	res.status(200).json({
		token: tokenForUser(req.user)
	});
};

module.exports = {
	signup,
	signin
};
