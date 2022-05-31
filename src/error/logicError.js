const { CustomError } = require('./customError')

/**
 * Logic Error Type Thrown when A Logical Error Occurs.
 * @class 
 */
class LogicError extends CustomError {
   
    /**
     * @constructor
     * @param {number} statusCode Status Code of the Error
     * @param {string} message  Message to be sent to the user
     */
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        this.message = message
        Object.setPrototypeOf(this, LogicError.prototype);

    }

    /**
     * Adjust Error to a Object that would be sent to the frontend
     * @returns {object} ErrorObject Error Object That will be sent to frontEnd
     * @returns {string} ErrorObject.message The Error Message
     * @method
     */
    serializeError() {
        return {
          message: this.message,
        };
      }
}
module.exports = {
    LogicError
}