import 'reflect-metadata';
import Beer from '../../../api/classes/Beer';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';

const originalEnv = { ...process.env };

describe('Beer', () => {
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
      const beer: Beer = container.get<Beer>(classTypes.Beer);

      expect(beer).toBeTruthy();
      expect(beer.name).toBe('');
      expect(beer.graduation).toBe(0);
      expect(beer.color).toBe('');
      expect(beer.score).toBe(0);
      expect(beer.price).toBe(0);
      expect(beer.idCategory).toBe(0);
      expect(beer.datePurchased).toBe('');
      expect(beer.dateDrinked).toBe('');
    });

    test('Expect idBeer to be 0 when no id supplied in constructor', () => {
      const beer: Beer = container.get<Beer>(classTypes.Beer);

      expect(beer.idBeer).toBe(0);
    });

    test('Expect idBeer to be 0 when 0 value supplied in constructor', () => {
      const beer: Beer = container.get<Beer>(classTypes.Beer);
      beer.Id = 0;

      expect(beer.idBeer).toBe(0);
    });

    test('Expect idBeer to be equal to value greater than 0 supplied in constructor', () => {
      const beer: Beer = container.get<Beer>(classTypes.Beer);
      beer.Id = 2;

      expect(beer.idBeer).toBe(2);
    });
  });
});
