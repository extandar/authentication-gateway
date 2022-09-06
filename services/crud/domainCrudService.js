
'use strict';

const { Domain } = require('../../models');
	
var CrudEvents;
try {
  	CrudEvents = require('../events/domainCrudEvents');
} catch (ex) {}

const service = {

	/*
	*  Create a document Domain
	*/
	create: async function (payload) {

		if(CrudEvents && CrudEvents.preCreateAction){
			payload = await CrudEvents.preCreateAction(payload);
		}

		
		let _new = new Domain();
		
		if(payload.hasOwnProperty('domain')){
			_new.domain = payload.domain;
		}
		
		if(payload.hasOwnProperty('defaultRole')){
			_new.defaultRole = payload.defaultRole;
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
	*  Update one document Domain
	*/
	update: async function (payload) {

		if(CrudEvents && CrudEvents.preUpdateAction){
			payload = await CrudEvents.preUpdateAction(payload);
		}

		
		let _document = await Domain.findOne({ _id:payload._id });
		
		if(payload.hasOwnProperty('domain')){
			_document.domain = payload.domain;
		}
		
		if(payload.hasOwnProperty('defaultRole')){
			_document.defaultRole = payload.defaultRole;
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
	*  Delete one document Domain
	*/
	delete: async function (payload) {

		if(CrudEvents && CrudEvents.preDeleteAction){
			payload = await CrudEvents.preDeleteAction(payload);
		}

		let deletedDocument = await Domain.deleteOne({ _id:payload._id });
		
		if(CrudEvents && CrudEvents.afterDeleteAction){
			deletedDocument = await CrudEvents.afterDeleteAction(deletedDocument);
		}

		return deletedDocument;

	}


}

module.exports = service;
