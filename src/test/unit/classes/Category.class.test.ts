import 'reflect-metadata';
import Category from '../../../api/classes/Category.class';

jest.mock('../../../api/classes/Category.class');
let category: Category;

describe('Category Class Unit', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        category = new Category();
    });

    test('Expect Category Constructor to be called', () => {
        expect(Category).toBeCalledTimes(1);
    });

    test('Expect Category object to exist', () => {
        expect(Category).toBeCalledTimes(1);
        expect(category).toBeTruthy();
    });
});