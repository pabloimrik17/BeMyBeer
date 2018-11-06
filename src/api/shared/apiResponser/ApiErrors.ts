// FORMAT
// CLASSNAME_FUNCTIONNAME_ERRORDESCRIPTION

interface IApiErrorInfo {
  code: number;
  message: string;
}

interface IApiErrorDefault {
  SUCCESS: IApiErrorInfo;
  ERROR: IApiErrorInfo;
}

interface ApiErrorObjectModel {
  COMMON_NO_ID: IApiErrorInfo;
  GET_QUERY: IApiErrorInfo;
  SAVE_QUERY: IApiErrorInfo;
  UPDATE_QUERY: IApiErrorInfo;
  DELETE_QUERY: IApiErrorInfo;
  GET_ALL_QUERY: IApiErrorInfo;
}

interface IApiErrorCategoryModel {
  CREATE_ERROR: IApiErrorInfo;
}

interface IApiError {
  DEFAULT: IApiErrorDefault;
  OBJECT_MODEL: ApiErrorObjectModel;
  CATEGORY_MODEL: IApiErrorCategoryModel;
}

export const apiErrors: IApiError = {
  DEFAULT: {
    SUCCESS: { code: 0, message: 'OK' },
    ERROR: { code: -1, message: 'UNKNOWN ERROR' },
  },
  OBJECT_MODEL: {
    COMMON_NO_ID: { code: 1, message: 'No valid id object' },
    GET_QUERY: { code: 2, message: 'Something wrong happened fetching the element data' },
    GET_ALL_QUERY: { code: 3, message: 'Something wrong happened fetching all elements' },
    SAVE_QUERY: { code: 4, message: 'Something wrong happened saving the  element data' },
    UPDATE_QUERY: { code: 5, message: 'Something wrong happened updating the element data' },
    DELETE_QUERY: { code: 6, message: 'Something wrong happened deleting the element' },
  },

  CATEGORY_MODEL: {
    CREATE_ERROR: { code: 2, message: 'Something wrong happened when creating a new category' },
  },
};
