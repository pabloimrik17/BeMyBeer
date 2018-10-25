import BeerDb from '../../../api/classes/BeerDb';

let beerDb: BeerDb = undefined;

describe('BeerDb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    beerDb = new BeerDb();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
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