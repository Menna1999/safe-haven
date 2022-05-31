const { CustomError } = require('./customError')

/**
 * Not Found Error Type
 * @class 
 */
class NotFound extends CustomError {

    /**
     * Status Code of the Error
     * @field
     */
    statusCode = 404;

    /**
     * @constructor
     */
    constructor(){
        super('Route Not Found')
        Object.setPrototypeOf(this, NotFound.prototype);

    }
    /**
     * Adjust Error to a Object that would be sent to the frontend
     * @returns {object} ErrorObject Error Object That will be sent to frontEnd
     * @returns {string} ErrorObject.message The Error Message
     * @method
     */
    serializeError() {
        return {
          message: 'Not Found',
        };
      }
}
module.exports = {
    NotFound
}