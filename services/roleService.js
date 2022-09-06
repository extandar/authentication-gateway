'use strict';

const {Role} = require('../models');
const crypto = require('crypto');

const service = {


	/*
	*  Agrega permisos al rol especificado por el id
	*	permission:{}
	*/

	addPermission: async function (id, permission) {

	  	let _document = await Role.findOne({_id:id})

	  	if(_document){

	  		let founded = _document.permissions.find(element =>
	  			element.app_code == permission.app_code && element.permission == permission.permission 
	  		)

		  	if(!founded){
		  		_document.permissions.push(permission)
		  		_document = await _document.save()	
		  	}

	  	}
	  
	  	return _document
	  	
	},
}
 
module.exports = service;



