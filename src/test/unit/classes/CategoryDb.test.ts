import CategoryDb from '../../../api/classes/CategoryDb';

let categoryDb: CategoryDb = undefined;

describe('CategoryDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    categoryDb = new CategoryDb();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
      expect(categoryDb).toBeTruthy();
      expect(categoryDb.idCategory).toBe(0);
      expect(categoryDb.name).toBe('');
      expect(categoryDb.idParent).toBe(0);
    });
  });
});
