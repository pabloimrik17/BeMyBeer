import BeerDb from '../../../api/classes/BeerDb';
import { container } from '../../../api/ioc/ioc';
import { classTypes } from '../../../api/ioc/types';

const originalEnv = { ...process.env };

describe('BeerDb', () => {
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
      const beerDb: BeerDb = container.get<BeerDb>(classTypes.BeerDb);
      expect(beerDb).toBeTruthy();
      expect(beerDb.idBeer).toBe(0);
      expect(beerDb.name).toBe('');
      expect(beerDb.graduation).toBe(0);
      expect(beerDb.color).toBe('');
      expect(beerDb.score).toBe(0);
      expect(beerDb.price).toBe(0);
      expect(beerDb.idCategory).toBe(0);
      expect(beerDb.datePurchased).toBe('');
      expect(beerDb.dateDrinked).toBe('');
    });
  });
});
