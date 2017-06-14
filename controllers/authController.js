const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const config = require('../config/config');
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
	if (!req.body.username || !req.body.password) {
		res.status(422).send({ error: 'Must submit a username and password!' });
	}
	const username = req.body.username.toLowerCase();
	const password = req.body.password;
	const email = req.body.email.toLowerCase();

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

const toast = (req, res) => {
	console.log('intest');
	res.status(200).json({
		status: 'okay!'
	});
};

const plaintest = (req, res) => {
	console.log('intest3');
	res.status(200).json({
		status: 'okay3!'
	});
};

module.exports = {
	signup,
	signin,
	toast,
	plaintest
};
