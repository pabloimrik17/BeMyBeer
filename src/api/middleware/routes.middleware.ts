import ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator/check';
import { container } from '../ioc/ioc';
import { classTypes } from '../ioc/types';
import { apiErrors } from '../shared/apiResponser/ApiErrors';
import ApiResponser from '../shared/apiResponser/ApiResponser';
import CacheManager from '../shared/CacheManager';

const ajvalidator = new ajv({ allErrors: true, removeAdditional: 'all' });

export const validation = validationResult;

export const checkIdParam = () => param('id').exists().isInt();

export const checkBody = (schema: Object) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = ajvalidator.validate(schema, req.body);

    if (valid && Object.keys(req.body).length > 0) {
      next();
    } else {
      ApiResponser.responseError(res, apiErrors.ROUTES.NO_VALID_BODY);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheManager: CacheManager = container.get<CacheManager>(classTypes.CacheManager);
    const cachedData = await cacheManager.retrieve(req.originalUrl);
    if (cachedData) {
      await ApiResponser.responseSuccess(res, cachedData);
    } else {
      next();
    }

  } catch (e) {
    throw new Error('TODO CACHE MIDDLEWARE');
  }
};
