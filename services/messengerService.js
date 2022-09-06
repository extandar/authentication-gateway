
var apiEndpoint = process.env.MESSENGER_API_ENDPOINT;
var defaultSender = process.env.MESSENGER_DEFAULT_SENDER;

const LogService = require('../services/logService');

const service = {

	sendMail: async function (from, to, message) {

		console.log("Sending message");
		console.log("from:"+from);
		console.log("to:"+to);
		console.log("message:"+message);
	  	
	},

}
 
module.exports = service;



