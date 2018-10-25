import 'reflect-metadata';
import Category from '../../../api/classes/Category.class';

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

      expect(category.idCategory).toBe(0);
    });

    test('Expect idCategory to be 0 when 0 value supplied in constructor', () => {
      category = new Category(0);

      expect(category.idCategory).toBe(0);
    });

    test('Expect idCategory to be equal to value greater than 0 supplied in constructor', () => {
      category = new Category(2);

      expect(category.idCategory).toBe(2);
    });
  });
});