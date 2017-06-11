const AuthController = require('./controllers/authController');

module.exports = (app) => {
	app.get('/test', AuthController.tester);

	app.post('/signup', AuthController.signup);
};
