import * as lodash from 'lodash';
import ObjectModel from '../../../api/classes/ObjectModel.class';
import Database from '../../../api/shared/Database';


let objectModel: ObjectModel;
let database: Database;
let poolSpy: any = undefined;

describe('Object Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        database = new Database();
        poolSpy = jest.spyOn(database, 'Pool', 'get');
        objectModel = new ObjectModel(0, database);

    });


    test('For Each Should Be Called Two Times', () => {

        objectModel.prueba();
        expect(lodash.forEach).toBeCalledTimes(2);
        expect(poolSpy).toHaveBeenCalledTimes(1);
    });
});