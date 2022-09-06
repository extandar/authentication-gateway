

const { Domain } = require('../../models');
const DomainCrudService = require('../../services/crud/domainCrudService');
const HandledHtmlError = require('../../exceptions/HandledHtmlError');
const LogService = require('../../services/logService');

/*
* 	Must access by POST method
*	Execute a query in the collection Domain
*	filter is Object
* 	limit is an Integer
* 	test: curl -d '{"filter":{}, "limit":"20"}' -H "Content-Type: application/json" -X POST http://localhost:PORT/domain
*/

exports.viewListDomain = function(req, res) {

	const lang = req.body.language;

	try{

		let filter = req.body.filter || {};

		let limit = req.body.limit * 1 || 100;

		let q = Domain.find(filter).limit(limit);

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
*  Search one Domain by id
*  test: curl -X GET http://localhost:PORT/domain/ID
*/
exports.viewOneDomain = function(req, res) {

	const lang = req.body.language;

	try{

		let id = req.params.id;

		if(!id){
			throw new HandledHtmlError("IdRequired", lang);
		}

		Domain.findOne({ _id:id },function(err, data) {
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
*	Create one Domain
*/
exports.createOneDomain = async function(req, res) {	

	const lang = req.body.language;

	try{


		let _new = await DomainCrudService.create(req.body);

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
*	Update one Domain
*/
exports.updateOneDomain = async function(req, res) {

	const lang = req.body.language;

	try{

		if(!req.body._id){
			throw new HandledHtmlError("IdRequired", lang);
		}

		let updatedDocument = await DomainCrudService.update(req.body);

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
*	Delete one Domain
*/
exports.removeOneDomain = async function(req, res) {

	const lang = req.body.language;

	try{

		if(!req.body._id){
			throw new HandledHtmlError("IdRequired", lang);
		}

		let deletedDocument = await DomainCrudService.delete(req.body);

		res.json({ resultSet: deletedDocument, message: 'ok' });

	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}
};


