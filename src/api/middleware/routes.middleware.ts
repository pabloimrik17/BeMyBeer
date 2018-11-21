import ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator/check';
import { container } from '../ioc/ioc';
import { classTypes } from '../ioc/types';
import { apiErrors } from '../shared/apiResponser/ApiErrors';
import ApiResponser from '../shared/apiResponser/ApiResponser';
import CacheManager, { ResourceType } from '../shared/CacheManager';

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
  // TODO IMPROVE AND ABSTRACT BETTER
  try {
    const cacheManager = container.get<CacheManager>(classTypes.CacheManager);
    let cachedData = undefined;

    switch (req.method) {
      case 'GET': {
        cachedData = await cacheManager.retrieve(`${ResourceType.Get}_${req.originalUrl}`);
        break;
      }
      case 'POST': {
        cachedData = await cacheManager.retrieve(`${ResourceType.Create}_${req.originalUrl}`);
        break;
      }
      case 'PUT': {
        cachedData = await cacheManager.retrieve(`${ResourceType.Update}_${req.originalUrl}`);
        break;
      }
    }

    if (cachedData) {
      await ApiResponser.responseSuccess(res, cachedData);
    } else {
      next();
    }
  } catch (e) {
    throw new Error('TODO CACHE MIDDLEWARE');
  }
};
