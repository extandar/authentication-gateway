'use strict';

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { User } = require('../models');
const secret = process.env.SECRET_KEY;
const ACCESS_TOKEN_TIME_EXPIRE = process.env.ACCESS_TOKEN_TIME_EXPIRE;
const REFRESH_TOKEN_TIME_EXPIRE = process.env.REFRESH_TOKEN_TIME_EXPIRE;
const HandledHtmlError = require('../exceptions/HandledHtmlError');
const LogService = require('../services/logService');

const service = {

	signIn: async function (payload) {

		const lang = payload.language;

		let user = await User.findOne({ email:payload.email });
		
	    if (!user) {
	     	throw new HandledHtmlError('UserDoesNotExist', lang);
	    }

	    var passwordIsValid = bcrypt.compareSync(
	        payload.password,
	        user.password
	  	);

	    if (!passwordIsValid) {
	    	throw new HandledHtmlError('InvalidPassword', lang);
		}

		var accessToken =  this.generateAccessToken(user, lang);
		var refreshToken =  this.generateRefreshToken(user);

		user.refreshTokens.push({device:'unknown', token:refreshToken});
		await user.save();

	    return { accessToken, refreshToken };
	  	
	},

	refreshToken: async function (payload) {

		const lang = payload.language;
		const refreshToken = payload.refreshToken;

		let decoded;

		try{

			decoded = jwt.verify(refreshToken, secret);	

		}catch(err){
			
			if( err.name == 'TokenExpiredError' ){
				
				LogService.debug("Refresh token expired, deleting...")

				decoded = jwt.decode(refreshToken);
				let user = await User.findOne({ _id: decoded.id });
				if (user) {

					let index = user.refreshTokens.findIndex(element=>{
						return element.token == refreshToken;
					})

					if(index>=0){
						user.refreshTokens.splice(index,1);
						await user.save();
					}
				}
				throw new HandledHtmlError('RefreshTokenExpired', lang);
			}else{
				LogService.error(err);
				throw new HandledHtmlError('RefreshTokenInvalid', lang);
			}

		}

		let userId = decoded.id

		let user = await User.findOne({ _id: userId });

		if (!user) {
			throw new HandledHtmlError('UserDoesNotExist', lang);
		}

		let tokenFounded = user.refreshTokens.find(element=>{
			return element.token == refreshToken;
		})

		if(tokenFounded){
			return  this.generateAccessToken(user, lang);	
		}else{
			throw new HandledHtmlError('RefreshTokenDoNotExist', lang);
		}


	},

	generateAccessToken:  function (user, lang='en') {

		if (!user.isActive) {
	    	throw new HandledHtmlError('UserNotActive', lang);
	    }

		//TODO
		//Make permisions
		let permisions = [];

		var accessToken = jwt.sign(
			{ 
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone,
				permisions: permisions
			},
			secret,
			{ expiresIn: ACCESS_TOKEN_TIME_EXPIRE }
		);

		return accessToken;

	},

	generateRefreshToken:  function (user) {

		var refreshToken = jwt.sign(
			{ id: user._id },
			secret,
			{ expiresIn: REFRESH_TOKEN_TIME_EXPIRE }
		);

		return refreshToken;
	}
}
 
module.exports = service;



