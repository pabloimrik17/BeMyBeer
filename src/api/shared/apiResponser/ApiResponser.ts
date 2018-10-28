import { apiErrors } from './ApiErrors';
import { Response } from 'express';

export interface ApiResponse {
  responseCode: number
  responseMessage: string
  responseData: Array<any> | Object
}

export type ResponseErrorOptions = {
  data: any
  canContinue: boolean
}

export default class ApiResponser {
  // TODO TIPAR CON OBJECT MODEL
  static responseSuccess(res: Response, data: Object = {}) {
    const responseObject: ApiResponse = {
      responseCode: apiErrors.DEFAULT.SUCCESS.code,
      responseMessage: apiErrors.DEFAULT.SUCCESS.message,
      responseData: data,
    };

    res.status(200);
    res.json(responseObject);
  }

  static responseError(res: Response, error: any, options: ResponseErrorOptions = {
    data: {},
    canContinue: true,
  }) {
    const responseObject: ApiResponse = {
      responseCode: typeof error === 'undefined' ? apiErrors.DEFAULT.ERROR.code : error.code,
      responseMessage: typeof error === 'undefined' ? apiErrors.DEFAULT.ERROR.message : error.message,
      responseData: typeof options.data === 'undefined' ? {} : error.data,
    };

    res.status(500);
    res.json(responseObject);

    if (!options.canContinue) {
      process.exit(1);
    }
  }
}