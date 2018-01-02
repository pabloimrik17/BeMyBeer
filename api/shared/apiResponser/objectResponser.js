const _RESPONSE_DEFAULT_SUCCESS_MESSAGE_ = 'OK';

const { apiErrors } = require('./apiErrors');

class ObjectResponser {
    static responseSuccess(res, data = {}) {
        const responseObject = {
            responseCode: 0,
            responseMessage: _RESPONSE_DEFAULT_SUCCESS_MESSAGE_,
            responseData: data,
        };

        res.status(200);
        res.json(responseObject);
    }

    static responseError(res, error, options = {}) {
        if (typeof options.canContinue === 'undefined') {
            options.canContinue = true;
        }

        if (typeof options.data === 'undefined') {
            options.data = {};
        }

        const responseObject = {
            responseCode: apiErrors[error].code,
            responseMessage: apiErrors[error].message,
            responseData: options.data,
        };

        res.status(500);
        res.json(responseObject);

        if(options.canContinue === false) {
            throw new Error(responseObject);
        }
    }
}

module.exports = ObjectResponser;
