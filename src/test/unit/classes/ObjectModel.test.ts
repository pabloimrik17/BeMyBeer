import * as lodash from 'lodash';
import ObjectModel from '../../../api/classes/ObjectModel.class';
import Database from '../../../api/shared/Database';
import { APPLICACION_TYPES } from '../../../api/ioc/THIRD_PARTY_TYPES';
import { container } from '../../../api/ioc/ioc';


let objectModel: ObjectModel;
let database: Database;
let poolSpy: any = undefined;

describe('Object Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        database = new Database();
        poolSpy = jest.spyOn(database, 'Pool', 'get');
        const a = container.get<ObjectModel>(APPLICACION_TYPES.ObjectModel);
        const b = '';

    });


    test('For Each Should Be Called Two Times', () => {

        objectModel.prueba();
        expect(lodash.forEach).toBeCalledTimes(2);
        expect(poolSpy).toHaveBeenCalledTimes(1);
    });
});