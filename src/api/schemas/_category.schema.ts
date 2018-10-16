export const createCategory = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    name: {
      $id: '/properties/name',
      type: 'string',
      title: 'The Name Schema.',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: [
        'Pale Ale',
      ],
    },
    idParent: {
      $id: '/properties/idCategory',
      type: 'integer',
      title: 'The Idcategory Schema.',
      description: 'An explanation about the purpose of this instance.',
      default: 0,
      examples: [
        0,
      ],
    },
  },
  required: [
    'name',
    'idParent',
  ],
};

export const updateCategory = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    name: {
      $id: '/properties/name',
      type: 'string',
      title: 'The Name Schema.',
      description: 'An explanation about the purpose of this instance.',
      default: '',
      examples: [
        'Pale Ale',
      ],
    },
    idParent: {
      $id: '/properties/idCategory',
      type: 'integer',
      title: 'The Idcategory Schema.',
      description: 'An explanation about the purpose of this instance.',
      default: 0,
      examples: [
        0,
      ],
    },
  },
  required: [
    'name',
    'idParent',
  ],
};
