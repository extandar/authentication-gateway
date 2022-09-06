
'use strict';

const { Rol } = require('../../models');
	
var CrudEvents;
try {
  	CrudEvents = require('../events/rolCrudEvents');
} catch (ex) {}

const service = {

	/*
	*  Create a document Rol
	*/
	create: async function (payload) {

		if(CrudEvents && CrudEvents.preCreateAction){
			payload = await CrudEvents.preCreateAction(payload);
		}

		
		let _new = new Rol();
		
		if(payload.hasOwnProperty('title')){
			_new.title = payload.title;
		}
		
		if(payload.hasOwnProperty('permissions')){
			_new.permissions = payload.permissions;
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
	*  Update one document Rol
	*/
	update: async function (payload) {

		if(CrudEvents && CrudEvents.preUpdateAction){
			payload = await CrudEvents.preUpdateAction(payload);
		}

		
		let _document = await Rol.findOne({ _id:payload._id });
		
		if(payload.hasOwnProperty('title')){
			_document.title = payload.title;
		}
		
		if(payload.hasOwnProperty('permissions')){
			_document.permissions = payload.permissions;
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
	*  Delete one document Rol
	*/
	delete: async function (payload) {

		if(CrudEvents && CrudEvents.preDeleteAction){
			payload = await CrudEvents.preDeleteAction(payload);
		}

		let deletedDocument = await Rol.deleteOne({ _id:payload._id });
		
		if(CrudEvents && CrudEvents.afterDeleteAction){
			deletedDocument = await CrudEvents.afterDeleteAction(deletedDocument);
		}

		return deletedDocument;

	}


}

module.exports = service;
