exports.getBeer = {};

exports.getAllBeers = {
    definitions: {},
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/root.json',
    type: 'object',
    title: 'The Root Schema',
    required: [
        'idBeer',
        'name',
        'graduation',
        'color',
        'score',
        'price',
        'idCategory',
        'datePurchased',
        'dateDrinked',
        'createdAt',
        'updatedAt',
    ],
    properties: {
        idBeer: {
            $id: '#/properties/idBeer',
            type: 'integer',
            title: 'The Idbeer Schema',
            default: 0,
            examples: [
                1,
            ],
        },
        name: {
            $id: '#/properties/name',
            type: 'string',
            title: 'The Name Schema',
            default: '',
            examples: [
                'aasda',
            ],
            pattern: '^(.*)$',
        },
        graduation: {
            $id: '#/properties/graduation',
            type: 'integer',
            title: 'The Graduation Schema',
            default: '',
            examples: [
                '12.00',
            ],
            pattern: '^(.*)$',
        },
        color: {
            $id: '#/properties/color',
            type: 'string',
            title: 'The Color Schema',
            default: '',
            examples: [
                'FFF',
            ],
            pattern: '^(.*)$',
        },
        score: {
            $id: '#/properties/score',
            type: 'integer',
            title: 'The Score Schema',
            default: 0,
            examples: [
                0,
            ],
        },
        price: {
            $id: '#/properties/price',
            type: 'integer',
            title: 'The Price Schema',
            default: '',
            examples: [
                '0.00',
            ],
            pattern: '^(.*)$',
        },
        idCategory: {
            $id: '#/properties/idCategory',
            type: 'integer',
            title: 'The Idcategory Schema',
            default: 0,
            examples: [
                2,
            ],
        },
        datePurchased: {
            $id: '#/properties/datePurchased',
            type: 'string',
            title: 'The Datepurchased Schema',
            default: '',
            examples: [
                '2018-09-16',
            ],
            pattern: '^(.*)$',
        },
        dateDrinked: {
            $id: '#/properties/dateDrinked',
            type: 'string',
            title: 'The Datedrinked Schema',
            default: '',
            examples: [
                '2018-09-16',
            ],
            changeme: null,
            pattern: '^(.*)$',
        },
        createdAt: {
            $id: '#/properties/createdAt',
            type: 'string',
            title: 'The Createdat Schema',
            default: '',
            examples: [
                '2018-09-17T10:19:45Z',
            ],
            pattern: '^(.*)$',
        },
        updatedAt: {
            $id: '#/properties/updatedAt',
            type: 'string',
            title: 'The Updatedat Schema',
            default: '',
            examples: [
                '2018-09-17T10:19:47Z',
            ],
            pattern: '^(.*)$',
        },
    },
};

exports.createBeer = {
    definitions: {},
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/root.json',
    type: 'object',
    title: 'The Root Schema',
    required: [
        'name',
        'graduation',
        'idCategory',
        'datePurchased',
    ],
    properties: {
        name: {
            $id: '#/properties/name',
            type: 'string',
            title: 'The Name Schema',
            default: '',
            examples: [
                'aasda',
            ],
            pattern: '^(.*)$',
        },
        graduation: {
            $id: '#/properties/graduation',
            type: 'integer',
            title: 'The Graduation Schema',
            default: '',
            examples: [
                '12.00',
            ],
            pattern: '^(.*)$',
        },
        color: {
            $id: '#/properties/color',
            type: 'string',
            title: 'The Color Schema',
            default: '',
            examples: [
                'FFF',
            ],
            pattern: '^(.*)$',
        },
        score: {
            $id: '#/properties/score',
            type: 'integer',
            title: 'The Score Schema',
            default: 0,
            examples: [
                0,
            ],
        },
        price: {
            $id: '#/properties/price',
            type: 'integer',
            title: 'The Price Schema',
            default: '',
            examples: [
                '0.00',
            ],
            pattern: '^(.*)$',
        },
        idCategory: {
            $id: '#/properties/idCategory',
            type: 'integer',
            title: 'The Idcategory Schema',
            default: 0,
            examples: [
                2,
            ],
        },
        datePurchased: {
            $id: '#/properties/datePurchased',
            type: 'string',
            title: 'The Datepurchased Schema',
            default: '',
            examples: [
                '2018-09-16',
            ],
            pattern: '^(.*)$',
        },
        dateDrinked: {
            $id: '#/properties/dateDrinked',
            type: 'string',
            title: 'The Datedrinked Schema',
            default: '',
            examples: [
                '2018-09-16',
            ],
            changeme: null,
            pattern: '^(.*)$',
        },
    },
};

exports.updateBeer = {
    definitions: {},
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/root.json',
    type: 'object',
    title: 'The Root Schema',
    required: [],
    properties: {
        name: {
            $id: '#/properties/name',
            type: 'string',
            title: 'The Name Schema',
            default: '',
            examples: [
                'aasda',
            ],
            pattern: '^(.*)$',
        },
        graduation: {
            $id: '#/properties/graduation',
            type: 'integer',
            title: 'The Graduation Schema',
            default: '',
            examples: [
                '12.00',
            ],
            pattern: '^(.*)$',
        },
        color: {
            $id: '#/properties/color',
            type: 'string',
            title: 'The Color Schema',
            default: '',
            examples: [
                'FFF',
            ],
            pattern: '^(.*)$',
        },
        score: {
            $id: '#/properties/score',
            type: 'integer',
            title: 'The Score Schema',
            default: 0,
            examples: [
                0,
            ],
        },
        price: {
            $id: '#/properties/price',
            type: 'integer',
            title: 'The Price Schema',
            default: '',
            examples: [
                '0.00',
            ],
            pattern: '^(.*)$',
        },
        idCategory: {
            $id: '#/properties/idCategory',
            type: 'integer',
            title: 'The Idcategory Schema',
            default: 0,
            examples: [
                2,
            ],
        },
        datePurchased: {
            $id: '#/properties/datePurchased',
            type: 'string',
            title: 'The Datepurchased Schema',
            default: '',
            examples: [
                '2018-09-16T22:00:00.000Z',
            ],
            pattern: '^(.*)$',
        },
        dateDrinked: {
            $id: '#/properties/dateDrinked',
            type: 'string',
            title: 'The Datedrinked Schema',
            default: '',
            examples: [
                '2018-09-16T22:00:00.000Z',
            ],
            changeme: null,
            pattern: '^(.*)$',
        },
    },
};
