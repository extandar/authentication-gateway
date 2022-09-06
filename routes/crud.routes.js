const domainCrudController = require('../controllers/crud/domainCrudController');
const rolCrudController = require('../controllers/crud/rolCrudController');
const userCrudController = require('../controllers/crud/userCrudController');

const prefix = `/api/${process.env.API_PREFIX}`;
const { auth, language } = require('../middlewares');

module.exports = function (app, db) {
	    

	/*
  	*  	Domain Routes
  	*/

  	app.post(prefix+'/domains', auth.verify, (req, res) => domainCrudController.viewListDomain(req, res));
  	app.get(prefix+'/domain/:id', auth.verify, (req, res) => domainCrudController.viewOneDomain(req, res));
  	app.post(prefix+'/domain/create', auth.verify, (req, res) => domainCrudController.createOneDomain(req, res));
  	app.post(prefix+'/domain/update', auth.verify, (req, res) => domainCrudController.updateOneDomain(req, res));
  	app.post(prefix+'/domain/remove', auth.verify, (req, res) => domainCrudController.removeOneDomain(req, res));



	/*
  	*  	Rol Routes
  	*/

  	app.post(prefix+'/rols', auth.verify, (req, res) => rolCrudController.viewListRol(req, res));
  	app.get(prefix+'/rol/:id', auth.verify, (req, res) => rolCrudController.viewOneRol(req, res));
  	app.post(prefix+'/rol/create', auth.verify, (req, res) => rolCrudController.createOneRol(req, res));
  	app.post(prefix+'/rol/update', auth.verify, (req, res) => rolCrudController.updateOneRol(req, res));
  	app.post(prefix+'/rol/remove', auth.verify, (req, res) => rolCrudController.removeOneRol(req, res));



	/*
  	*  	User Routes
  	*/

  	app.post(prefix+'/users', auth.verify, (req, res) => userCrudController.viewListUser(req, res));
  	app.get(prefix+'/user/:id', auth.verify, (req, res) => userCrudController.viewOneUser(req, res));
  	app.post(prefix+'/user/create', auth.verify, (req, res) => userCrudController.createOneUser(req, res));
  	app.post(prefix+'/user/update', auth.verify, (req, res) => userCrudController.updateOneUser(req, res));
  	app.post(prefix+'/user/remove', auth.verify, (req, res) => userCrudController.removeOneUser(req, res));

}
	    