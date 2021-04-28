import { DynamoRepositoryInterface } from '../../../src/app/contracts/dynamo_repository';
import { response } from '../../events/200.task_cu';

export class DynamoMockClass implements DynamoRepositoryInterface{
    databaseClient: any;

    add(_item: any): Promise<any> {
        return Promise.resolve({});
    }
    get(_id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    scan(_pageSize: number, _search: string, _lastIndex: string): Promise<any> {
        return Promise.resolve({lastEvaluatedKey: 1,
            items: response.data,
            total: response.data.length});
    }
    updateItem(_id: string, _attributes: any): Promise<any> {
        return Promise.resolve({});
    }
    removeItem(_id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    inactivateItem(_id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    addItemsToArray(_id: string, _attributes: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    removeItemsFromArray(_id: string, _attributes: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

}