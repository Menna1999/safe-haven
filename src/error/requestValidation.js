const { CustomError } = require('./customError')

/**
 * Request Valiation Error Type
 * @class 
 */
class RequestValidationError extends CustomError {

    /**
     * Status Code of the Error
     * @field
     */
    statusCode = 400;

    /**
     * Constructor Of Request Validatior Error
     * @constructor
     * @param {object[]} errors
     * @param {object} error
     * @param {string} error.msg 
     */
    constructor(errors){
        super('Request Validation Error')
        this.errors = errors
        Object.setPrototypeOf(this, RequestValidationError.prototype);

    }

     /**
     * Adjust Error to a Object that would be sent to the frontend
     * @returns {object} ErrorObject Error Object That will be sent to frontEnd
     * @returns {string} ErrorObject.message The Error Message
     * @method
     */
    serializeError() {
        return {
          message: this.errors[0].msg,
        };
      }
}
module.exports = {
    RequestValidationError
}