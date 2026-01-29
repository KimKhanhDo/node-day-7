const { HTTP_STATUS, ERROR_MESSAGES } = require('@/config/constant');
const { JsonWebTokenError } = require('jsonwebtoken');

const exceptionHandler = (err, req, res, next) => {
    let status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let errorMessage = err.message || String(err);

    if (err instanceof JsonWebTokenError) {
        console.log('JWT Error:', err.message); // DEBUG: See actual error
        errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
        status = HTTP_STATUS.UNAUTHORIZED;
    }

    res.error(status, errorMessage, err);
};

module.exports = exceptionHandler;
