const _RESPONSE_DEFAULT_SUCCESS_MESSAGE_ = 'OK';

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
    }
}
