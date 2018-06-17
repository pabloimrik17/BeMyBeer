const { param, validationResult } = require('express-validator/check');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });

exports.validationResult = validationResult;

exports.checkIdParam = () => {
    return param('id').exists().isInt();
};

exports.checkBody = (schema) => {
    return (req, res, next) => {

        const valid = ajv.validate(schema, req.body);
        if(valid) {
            next();
        } else {
            res.json('TODO TO CHANGE');
        }
    }
};
