const mongoose = require('mongoose');
const User = require('../models/users');

mongoose.Promises = global.Promises;

const tester = (req, res) => {
	res.status(200).json({
		okay: 'this is okay'
	});
};

const signup = (req, res) => {
	console.log('body', req.body);
	if (!req.body.username || !req.body.password) {
		res.status(422).send({ error: 'Must submit a username and password!' });
	}
	const username = req.body.username.toLowerCase();
	const password = req.body.password;

	const newUser = new User({ username, password });

	newUser.save()
	.then(() => {
		res.status(200)
		.send({ message: 'user saved' });
	})
	.catch((err) => {
		res.status(422)
		.send('unable to save: ', err);
	});
};

module.exports = {
	tester,
	signup
};
