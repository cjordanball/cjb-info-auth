const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
mongoose.Promises = global.Promises;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter username.'],
			lowercase: true
		},
		email: {
			type: String,
			lowercase: true
		},
		password: {
			type: String,
			required: [true, 'Please enter a password.']
		}
	}
);

// on save, ecncrypt the password
UserSchema.pre('save', function (next) {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(this.password, salt, null, (errr, hash) => {
			if (errr) {
				return next(errr);
			}
			this.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (submittedPassword, callback) {
	bcrypt.compare(submittedPassword, this.password, (err, isMatch) => {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

const UserClass = mongoose.model('user', UserSchema);

module.exports = UserClass;
