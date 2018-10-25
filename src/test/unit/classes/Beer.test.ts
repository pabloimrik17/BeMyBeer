import 'reflect-metadata';
import Beer from '../../../api/classes/Beer.class';

let beer: Beer;

describe('Beer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    test('Expect object to be instantiated properly', () => {
      beer = new Beer();

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
      beer = new Beer();

      expect(beer.idBeer).toBe(0);
    });

    test('Expect idBeer to be 0 when 0 value supplied in constructor', () => {
      beer = new Beer(0);

      expect(beer.idBeer).toBe(0);
    });

    test('Expect idBeer to be equal to value greater than 0 supplied in constructor', () => {
      beer = new Beer(2);

      expect(beer.idBeer).toBe(2);
    });
  });
});