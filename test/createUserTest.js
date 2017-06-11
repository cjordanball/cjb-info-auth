const assert = require('assert');
const User = require('../models/users');

describe('Creating a new user', () => {
	it('saves a user', (done) => {
		const jordan = new User({
			username: 'usernamejordan',
			password: 'my password'
		});
		jordan.save()
			.then(() => {
				assert(!jordan.isNew);
				assert(jordan.username === 'usernamejordan');
				assert(jordan.password === 'mypassword');
				done();
			})
			.catch((err) => {
				console.log('ERR: ', err);
				done();
			});
	});
});
