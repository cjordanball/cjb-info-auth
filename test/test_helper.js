const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/cjballInfoTestDB');
	mongoose.connection
	.once('open', () => { done(); })
	.on('error', (error) => {
		console.warn('Warning:', error);
	});
});

beforeEach((done) => {
	const { users } = mongoose.connection.collections;
	users.drop();
	done();
});
