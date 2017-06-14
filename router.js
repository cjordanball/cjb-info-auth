const AuthController = require('./controllers/authController');
const passport = require('passport');
require('./services/passport');


const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
	app.get('/auth/test', AuthController.toast);
	app.get('/test', AuthController.plaintest);
	app.post('/signup', AuthController.signup);

	app.post('/signin', requireSignin, AuthController.signin);
};
