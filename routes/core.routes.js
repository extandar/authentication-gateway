const statusController = require('../controllers/statusController');
const authController = require('../controllers/authController');
const testController = require('../controllers/testController');

const prefix = `/api/${ process.env.API_PREFIX }`;

const { auth, language } = require("../middlewares");

module.exports = function (app, db) {


	app.use(language.checkLanguage);

	/*
  	*  	Status
  	*/

  	app.get(prefix + '/ping', (req, res) => statusController.ping(req, res));

  	/*
  	*	Authentication
  	*/

  	app.post(prefix+'/signup', (req, res) => authController.signUp(req, res));
  	app.post(prefix+'/signin', (req, res) => authController.signIn(req, res));
  	app.post(prefix+'/token/refresh', (req, res) => authController.refreshToken(req, res));

  	/*
  	*	Testing
  	*/

  	app.post(prefix+'/test/user', auth.verify, (req, res) => testController.user(req, res));

}