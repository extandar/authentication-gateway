var mongoose = require('mongoose');
 
const schema = new mongoose.Schema(
	{
		
		domain: { type: String, unique: true, trim: true }, //ControlApp, EnduserApp, BusinessApp
		defaultRole: { type: mongoose.ObjectId, ref: 'Rol' }, 

	},

	{ timestamps: true },

);
 
module.exports = mongoose.model('Domain', schema);



/*
e.g.

turister.co
control.turister.co
operator.turister.co

menuff.com
business.menuff.com
control.menuff.com


*/