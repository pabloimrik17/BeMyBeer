import CategoryDb from '../../../api/classes/CategoryDb';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';

const originalEnv = { ...process.env };

describe('CategoryDb', () => {
  beforeEach(() => {
    container.snapshot();
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    container.restore();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
      const categoryDb: CategoryDb = container.get<CategoryDb>(classTypes.CategoryDb);
      expect(categoryDb).toBeTruthy();
      expect(categoryDb.idCategory).toBe(0);
      expect(categoryDb.name).toBe('');
      expect(categoryDb.idParent).toBe(0);
    });
  });
});
