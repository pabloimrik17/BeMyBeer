const apiErrors = require('./apiErrors');

class ObjectResponser {
    static responseSuccess(res, data = {}) {
        const responseObject = {
            responseCode: apiErrors.DEFAULT.SUCCESS.code,
            responseMessage: apiErrors.DEFAULT.SUCCESS.message,
            responseData: data,
        };

        res.status(200);
        res.json(responseObject);
    }

    static responseError(res, error, options = {}) {
        const responseObject = {
            responseCode: typeof error === 'undefined' ? apiErrors.DEFAULT.ERROR.code : error.code,
            responseMessage: typeof error === 'undefined' ? apiErrors.DEFAULT.ERROR.message : error.message,
            responseData: typeof options.data === 'undefined' ? {} : error.data,
        };

        res.status(500);
        res.json(responseObject);

        if (!options.canContinue || options.canContinue === false) {
            process.exit(1);
        }
    }
}

module.exports = ObjectResponser;
