/**
 * Abstract Error Class From Which different error types INherit
 * @abstract 
 */
class CustomError extends Error {

    /**
     * Status Code Of the Error
     * @field
     */
    statusCode;

    /**
     * Custom Class Error Constructor
     * @constructor
     */
    constructor(message){
      super(message)
      
      Object.setPrototypeOf(this, CustomError.prototype);
    }
    /**
     * Adjust Error to a Object that would be sent to the frontend
     * @method
     */
    seralizeError(){}
}
module.exports = {
    CustomError
}