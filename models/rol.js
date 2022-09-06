var mongoose = require('mongoose');
 
const schema = new mongoose.Schema(
	{
		
		title: { type: String, unique: true, trim: true }, //AdminDatabase, ContentManager, Boss, Manager
		permissions: [
			{
				title: { type: String, trim: true }, //e.g. Read database, Write database
				code:  { type: String, trim: true }, //e.g. /domain/create
			}
		]
		
	},

	{ timestamps: true },

);
 
module.exports = mongoose.model('Rol', schema);

