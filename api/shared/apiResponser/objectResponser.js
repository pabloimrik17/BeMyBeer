const _RESPONSE_DEFAULT_SUCCESS_MESSAGE_ = 'OK';
const _RESPONSE_DEFAULT_SUCCESS_CODE_ = 0;

const _RESPONSE_DEFAULT_ERROR_MESSAGE_ = 'UNKNOW ERROR';
const _RESPONSE_DEFAULT_ERROR_CODE_ = 4815162342;

class ObjectResponser {
    static responseSuccess(res, data = {}) {
        const responseObject = {
            responseCode: _RESPONSE_DEFAULT_SUCCESS_CODE_,
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

        if(typeof error === 'undefined') {
            error.code = _RESPONSE_DEFAULT_ERROR_CODE_;
            error.message = _RESPONSE_DEFAULT_ERROR_MESSAGE_;
        }

        const responseObject = {
            responseCode: error.code,
            responseMessage: error.message,
            responseData: options.data,
        };

        console.log(responseObject);

        res.status(500);
        res.json(responseObject);

        if(options.canContinue === false) {
            process.exit(1);
        }
    }
}

module.exports = ObjectResponser;
