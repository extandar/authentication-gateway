const jwt = require("jsonwebtoken");
const { User } = require("../models");
const secret = process.env.SECRET_KEY;
const HandledHtmlError = require('../exceptions/HandledHtmlError');
const LogService = require('../services/logService');

verify = (req, res, next) => {

    const lang = req.language;

    let authToken = req.headers.authorization;
    
    if (!authToken) {
      let err = new HandledHtmlError('AccessTokenRequired', lang);
      return res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
    }

    //remove Bearer
    authToken = authToken.split(' ')[1];

    jwt.verify(authToken, secret, (err, decoded) => {

      if (err) {

        if( err.name == 'TokenExpiredError' ){
          err = new HandledHtmlError('AccessTokenExpired', lang);
          return res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
        }else{
          err = new HandledHtmlError('AccessTokenInvalid', lang, err);
          LogService.error(err.message, err.errorCode, req, err);
          return res.status(err.htmlCode).send({ message: err.message, errorCode: err.errorCode });
          
        }
        
      }

      req.userId = decoded.id;
      next();

    });

};

const auth = {
  verify
};

module.exports = auth;

