// FORMAT
// CLASSNAME_FUNCTIONNAME_ERRORDESCRIPTION

module.exports = {
    DEFAULT: {
        SUCCESS: { code: 0, message: 'OK' },
        ERROR: { code: -1, message: 'UNKNOW ERROR' },
    },
    OBJECT_MODEL: {
        INIT_QUERY_ERROR: { code: 1, message: 'Something wrong happened initializing the element data' },
        SAVE_QUERY_ERROR: { code: 2, message: 'Something wrong happened saving the  element data' },
        UPDATE_QUERY_ERROR: { code: 3, message: 'Something wrong happened deleting the element data' },
        GET_ALL: { code: 1, message: 'Something wrong happend fetching all elements' },
    },

    CATEGORY_MODEL: {
        CREATE_ERROR: { code: 2, message: 'Something wrong happend when creating a new category' },
    },
};
