
'use strict';

const { User } = require('../../models');
	
var CrudEvents;
try {
  	CrudEvents = require('../events/userCrudEvents');
} catch (ex) {}

const service = {

	/*
	*  Create a document User
	*/
	create: async function (payload) {

		if(CrudEvents && CrudEvents.preCreateAction){
			payload = await CrudEvents.preCreateAction(payload);
		}

		
		let _new = new User();
		
		if(payload.hasOwnProperty('firebaseId')){
			_new.firebaseId = payload.firebaseId;
		}
		
		if(payload.hasOwnProperty('firstName')){
			_new.firstName = payload.firstName;
		}
		
		if(payload.hasOwnProperty('lastName')){
			_new.lastName = payload.lastName;
		}
		
		if(payload.hasOwnProperty('countryCode')){
			_new.countryCode = payload.countryCode;
		}
		
		if(payload.hasOwnProperty('city')){
			_new.city = payload.city;
		}
		
		if(payload.hasOwnProperty('email')){
			_new.email = payload.email;
		}
		
		if(payload.hasOwnProperty('emailVerified')){
			_new.emailVerified = payload.emailVerified;
		}
		
		if(payload.hasOwnProperty('password')){
			_new.password = payload.password;
		}
		
		if(payload.hasOwnProperty('phone')){
			_new.phone = payload.phone;
		}
		
		if(payload.hasOwnProperty('phoneVerifiedDate')){
			_new.phoneVerifiedDate = payload.phoneVerifiedDate;
		}
		
		if(payload.hasOwnProperty('profileImageUrl')){
			_new.profileImageUrl = payload.profileImageUrl;
		}
		
		if(payload.hasOwnProperty('genre')){
			_new.genre = payload.genre;
		}
		
		if(payload.hasOwnProperty('dob')){
			_new.dob = payload.dob;
		}
		
		if(payload.hasOwnProperty('language')){
			_new.language = payload.language;
		}
		
		if(payload.hasOwnProperty('isActive')){
			_new.isActive = payload.isActive;
		}
		
		if(payload.hasOwnProperty('roles')){
			_new.roles = payload.roles;
		}
		
		if(payload.hasOwnProperty('refreshTokens')){
			_new.refreshTokens = payload.refreshTokens;
		}
		
		if(CrudEvents && CrudEvents.beforeSaveCreateAction){
			_new = await CrudEvents.beforeSaveCreateAction(_new);
		}

		_new = await _new.save();

		if(CrudEvents && CrudEvents.afterSaveCreateAction){
			_new = await CrudEvents.afterSaveCreateAction(_new);
		}

		return _new;
	},


	/*
	*  Update one document User
	*/
	update: async function (payload) {

		if(CrudEvents && CrudEvents.preUpdateAction){
			payload = await CrudEvents.preUpdateAction(payload);
		}

		
		let _document = await User.findOne({ _id:payload._id });
		
		if(payload.hasOwnProperty('firebaseId')){
			_document.firebaseId = payload.firebaseId;
		}
		
		if(payload.hasOwnProperty('firstName')){
			_document.firstName = payload.firstName;
		}
		
		if(payload.hasOwnProperty('lastName')){
			_document.lastName = payload.lastName;
		}
		
		if(payload.hasOwnProperty('countryCode')){
			_document.countryCode = payload.countryCode;
		}
		
		if(payload.hasOwnProperty('city')){
			_document.city = payload.city;
		}
		
		if(payload.hasOwnProperty('email')){
			_document.email = payload.email;
		}
		
		if(payload.hasOwnProperty('emailVerified')){
			_document.emailVerified = payload.emailVerified;
		}
		
		if(payload.hasOwnProperty('password')){
			_document.password = payload.password;
		}
		
		if(payload.hasOwnProperty('phone')){
			_document.phone = payload.phone;
		}
		
		if(payload.hasOwnProperty('phoneVerifiedDate')){
			_document.phoneVerifiedDate = payload.phoneVerifiedDate;
		}
		
		if(payload.hasOwnProperty('profileImageUrl')){
			_document.profileImageUrl = payload.profileImageUrl;
		}
		
		if(payload.hasOwnProperty('genre')){
			_document.genre = payload.genre;
		}
		
		if(payload.hasOwnProperty('dob')){
			_document.dob = payload.dob;
		}
		
		if(payload.hasOwnProperty('language')){
			_document.language = payload.language;
		}
		
		if(payload.hasOwnProperty('isActive')){
			_document.isActive = payload.isActive;
		}
		
		if(payload.hasOwnProperty('roles')){
			_document.roles = payload.roles;
		}
		
		if(payload.hasOwnProperty('refreshTokens')){
			_document.refreshTokens = payload.refreshTokens;
		}
		
		if(CrudEvents && CrudEvents.beforeSaveUpdateAction){
			_document = await CrudEvents.beforeSaveUpdateAction(_document);
		}

		_document = await _document.save();

		if(CrudEvents && CrudEvents.afterSaveUpdateAction){
			_document = await CrudEvents.afterSaveUpdateAction(_document);
		}

		return _document;
	},

	/*
	*  Delete one document User
	*/
	delete: async function (payload) {

		if(CrudEvents && CrudEvents.preDeleteAction){
			payload = await CrudEvents.preDeleteAction(payload);
		}

		let deletedDocument = await User.deleteOne({ _id:payload._id });
		
		if(CrudEvents && CrudEvents.afterDeleteAction){
			deletedDocument = await CrudEvents.afterDeleteAction(deletedDocument);
		}

		return deletedDocument;

	}


}

module.exports = service;
