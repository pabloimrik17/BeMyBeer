const { param, validationResult } = require('express-validator/check');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });

exports.validationResult = validationResult;

exports.checkIdParam = () => param('id').exists().isInt();

exports.checkBody = schema => (req, res, next) => {
    try {
        const valid = ajv.validate(schema, req.body);

        if (valid && Object.keys(req.body).length > 0) {
            next();
        } else {
            res.json('TODO TO CHANGE');
        }
    } catch (error) {
        console.error(error)
    }
};
