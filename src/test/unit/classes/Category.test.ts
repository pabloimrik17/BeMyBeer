import 'reflect-metadata';
import Category from '../../../api/classes/Category';

let category: Category;

describe('Category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
      category = new Category();

      expect(category).toBeTruthy();
      expect(category.name).toBe('');
      expect(category.idParent).toBe(0);
    });

    test('Expect idCategory to be 0 when no id supplied in constructor', () => {
      category = new Category();

      expect(category.Id).toBe(0);
    });

    test('Expect idCategory to be 0 when 0 value supplied in constructor', () => {
      category = new Category();
      category.Id = 0;

      expect(category.Id).toBe(0);
    });

    test('Expect idCategory to be equal to value greater than 0 supplied in constructor', () => {
      category = new Category();
      category.Id = 2;

      expect(category.Id).toBe(2);
    });
  });
});
