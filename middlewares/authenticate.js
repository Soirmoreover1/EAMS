const jwt = require('jsonwebtoken');
const utli = require('util');
const asyncverify = utli.promisify(jwt.verify);
const customerError = require('../CustomerError');

const authorized = async (req, res, next) => {
    try {
      const { authorization: token } = req.headers;
      const decoded = await asyncverify(token, process.env.JWT_SECRET);
      req.user = decoded; // Set the user object in req.user
      console.log(req.params.id);
  
      if (decoded.role === 'admin') {
        return next(
          customerError({
            message: 'Not Authorized as an admin',
            statusCode: 401,
          })
        );
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };

  const adminauthorized = async (req, res, next) => {
    try {
      const { authorization: token } = req.headers;
      const decoded = await asyncverify(token, process.env.JWT_SECRET);
      req.user = decoded; // Set the user object in req.user
  
      if (decoded.role !== 'admin') {
        return next(
          customerError({
            message: 'Not Authorized as a user',
            statusCode: 401,
          })
        );
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = { authorized, adminauthorized };