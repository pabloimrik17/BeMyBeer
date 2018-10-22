import 'reflect-metadata';
import ObjectModel from '../../../api/classes/ObjectModel.class';
import * as lodash from 'lodash';
import Database from '../../../api/shared/Database';

jest.mock('../../../api/shared/Database');
/*jest.mock('../../../api/shared/Database', () => {
    return jest.fn().mockImplementation(() => {
        return {
            Pool: jest.fn()
        };
    });
}); */

let objectModel: ObjectModel;

describe('Object Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        objectModel = new ObjectModel(0);
    });

    test('For Each Should Be Called Two Times', () => {
        objectModel.prueba();
        expect(lodash.forEach).toHaveBeenCalledTimes(2);
    });

    test('hola', () => {
        const database: Database = new Database();
        const a = database.Pool;
        expect(typeof database.Pool).toBe('object');
        expect(database.Pool).toBeTruthy();
    });
});