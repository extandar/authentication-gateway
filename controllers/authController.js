
const { User, Domain } = require('../models');
const AuthPassword = require('../services/auth.password');
const HandledHtmlError = require('../exceptions/HandledHtmlError');
const UserCrudService = require('../services/crud/userCrudService');
const LogService = require('../services/logService');


// Create an user
/* 
	e.g.
	curl  -H "Content-Type: application/json" \
	-d '{"language":"es","countryCode":"CO","email":"aroldf@gmail.com","password":"12345678"}' \
	-X POST http://localhost:2021/api/test/auth/signup
*/

exports.signUp = async function(req, res) {

	const lang = req.language;

	try{	

		//Authentication method by default is password
		//Methods: password, otp, firebase

		let method = req.body.authMethod || 'password';

		if(!['password','otp','firebase'].includes(method)){
			throw new HandledHtmlError('ValidAuthMethodRequired', lang);
		}

		if(!req.body.countryCode){
			throw new HandledHtmlError('CountryCodeRequired', lang);
		}

		let user = null;

		if(req.body.email){
			user = await User.findOne({ email: req.body.email });

			if(user){
				throw new HandledHtmlError('EmailAlreadyRegistered', lang);
			}

		}else if(req.body.email){
			user = await User.findOne({ phone: req.body.phone });
			if(user){
				throw new HandledHtmlError('PhoneAlreadyRegistered', lang);
			}
		}else{
			throw new HandledHtmlError('EmailOrPhoneRequired', lang);
		}
		
		if(method == 'password'){

			if(!req.body.password){
				throw new HandledHtmlError('PasswordRequired', lang);
			}

			user = await UserCrudService.create(req.body);	
		}

		if(req.body.appDomain){
			let domain = await Domain.findOne({ domain: req.body.appDomain });
			if(domain && domain.defaultRole){
				user.roles.push(domain.defaultRole);
				await user.save();
			}	
		}

		user = user.toObject();

		delete user.password
		delete user.refreshTokens;
		delete user.updatedAt;
		delete user.createdAt;
		delete user.isActive;
		delete user.roles;

		res.json({ resultSet: user, message: "ok" });
	
	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}

};


//Login
/*
curl  -H "Content-Type: application/json" \
	-d '{"language":"es","email":"aroldf@gmail.com","password":"12345678","authMethod":"password"}' \
	-X POST http://localhost:2021/api/test/auth/signin
*/

exports.signIn = async function(req, res) {

	const lang = req.language;

	try{	

		if(!req.body.authMethod){
			throw new HandledHtmlError('AuthMethodRequired', lang);
		}

		if(!req.body.email){
			throw new HandledHtmlError('EmailRequired', lang);
		}

		let tokens;

		if(req.body.authMethod == 'password'){

			tokens = await AuthPassword.signIn(req.body);

		}else if(req.body.authMethod == 'otp'){

			//TODO

		}else if(req.body.authMethod == 'firebase'){

			//TODO
			
		}

        res.json({ 
        	resultSet: { 
        		accessToken: tokens.accessToken, 
        		refreshToken: tokens.refreshToken 
        	},
        	message: 'ok'
        });

	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}
	
};


//Refresh token
/*
curl  -H "Content-Type: application/json" \
	-d '{"language":"es","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTAxNGYxYzBlMzkyNDlmZjBhODU1OCIsImlhdCI6MTY2MjAwMTU4MiwiZXhwIjoxNjYyMDA1MTgyfQ.hWGInkoD1PhUX07R0wrvEKC92YRaCBGTk3Yz5KaFOdQ"}' \
	-X POST http://localhost:2021/api/test/auth/token/refresh
*/

exports.refreshToken = async function(req, res) {

	const lang = req.language;

	try{

		if(!req.body.refreshToken){
			throw new HandledHtmlError('RefreshTokenRequired', lang);
		}

		let accessToken = await AuthPassword.refreshToken(req.body);

        res.json({ resultSet: { accessToken: accessToken }, message: 'ok' });

	}catch(err){
		if(!(err instanceof HandledHtmlError)){
			err = new HandledHtmlError('SomethingFailed', lang, err);
		}
		LogService.error(err.message, err.errorCode, req, err);
		res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
	}
	
};
