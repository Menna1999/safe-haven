const { CustomError } = require('../error/customError');
/**
 * Handles any errors of implemented requests by sending 400 (Bad Request) and a message
 * and printing the error in the console
 * @param  {Object} error
 * @param  {Object} req
 * @param  {Object} res
 * @param  {function} next
 */
const errorHandler = (error, req, res, next) => {
    if (process.env.NODE_ENV != 'TEST') console.log(error);
    if (error instanceof CustomError)
        res.status(error.statusCode).send(error.serializeError());
    else
        res.status(400).send({
            message: 'Something went wrong',
        });
};

module.exports = {
    errorHandler,
};
