const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promises = global.Promises;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter username.'],
			lowercase: true
		},
		password: {
			type: String,
			required: [true, 'Please enter a password.']
		}
	}
);

const UserClass = mongoose.model('user', UserSchema);

module.exports = UserClass;
