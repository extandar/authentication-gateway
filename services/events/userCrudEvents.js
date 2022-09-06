
var bcrypt = require("bcryptjs");

const preCreateAction = async function(payload) {
	if(payload.password){
		payload.password = bcrypt.hashSync(payload.password, 8);
	}
	return payload;
};


module.exports = { preCreateAction };