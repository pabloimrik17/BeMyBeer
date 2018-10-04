import {param, validationResult} from 'express-validator/check'
import Ajv from 'ajv'
import {Request, Response, NextFunction} from 'express'

const ajv = new Ajv({allErrors: true, removeAdditional: 'all'})

export const validation = validationResult

export const checkIdParam = () => param('id').exists().isInt();

export const checkBody = (schema: Object) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = ajv.validate(schema, req.body)

    if (valid && Object.keys(req.body).length > 0) {
      next();
    } else {
      res.json('TODO TO CHANGE')
    }
  } catch (error) {
    console.log(error)
  }
}