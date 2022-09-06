

const { User } = require('../../models');
const UserCrudService = require('../../services/crud/userCrudService');
const HandledHtmlError = require('../../exceptions/HandledHtmlError');
const LogService = require('../../services/logService');

/*
* 	Must access by POST method
*	Execute a query in the collection User
*	filter is Object
* 	limit is an Integer
* 	test: curl -d '{"filter":{}, "limit":"20"}' -H "Content-Type: application/json" -X POST http://localhost:PORT/user
*/

exports.viewListUser = function(req, res) {

	const lang = req.body.language;

	try{

		let filter = req.body.filter || {};

		let limit = req.body.limit * 1 || 100;

		let q = User.find(filter).limit(limit);

		q.exec(function(err, data) {
		    if (err) {
		    	
				let	err = new HandledHtmlError('SomethingFailed', lang, err);
				LogService.error(err.message, err.errorCode, req, err);
				res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });

		    }else{

		    	if(data){
		    		LogService.debug("Found :"+data.length+" rows");
		    		res.json({ resultSet: data, message: 'ok' });	
		    	}else{
		    		res.json({ resultSet:[], message: 'No data' });
		    	}
		    	
		    }
	  	});

  	}catch(err){
  		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}

};

/*
*  Search one User by id
*  test: curl -X GET http://localhost:PORT/user/ID
*/
exports.viewOneUser = function(req, res) {

	const lang = req.body.language;

	try{

		let id = req.params.id;

		if(!id){
			throw new HandledHtmlError("IdRequired", lang);
		}

		User.findOne({ _id:id },function(err, data) {
		    if (err) {

		    	let	err = new HandledHtmlError('SomethingFailed', lang, err);
				LogService.error(err.message, err.errorCode, req, err);
				res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });

		    }else{

		    	if(data){
			    	res.json({ resultSet: data, message: 'ok' });
		    	}else{
		    		res.json({ message: 'No data' });
		    	}
		    }
	  	})

  	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}
};


/*
*	Create one User
*/
exports.createOneUser = async function(req, res) {	

	const lang = req.body.language;

	try{

		
		if(!req.body.countryCode){
			throw new HandledHtmlError("CountryCodeRequired", lang);
		}

		let _new = await UserCrudService.create(req.body);

		res.json({ resultSet: _new, message: 'ok' });

	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}

};


/*
*	Update one User
*/
exports.updateOneUser = async function(req, res) {

	const lang = req.body.language;

	try{

		if(!req.body._id){
			throw new HandledHtmlError("IdRequired", lang);
		}

		let updatedDocument = await UserCrudService.update(req.body);

		res.json({ resultSet: updatedDocument, message: 'ok' });

	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}

};


/*
*	Delete one User
*/
exports.removeOneUser = async function(req, res) {

	const lang = req.body.language;

	try{

		if(!req.body._id){
			throw new HandledHtmlError("IdRequired", lang);
		}

		let deletedDocument = await UserCrudService.delete(req.body);

		res.json({ resultSet: deletedDocument, message: 'ok' });

	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}
};


