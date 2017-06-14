const AuthController = require('./controllers/authController');
const passport = require('passport');
require('./services/passport');


const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
	app.post('/auth/signup', AuthController.signup);

	app.post('/auth/signin', requireSignin, AuthController.signin);
};
