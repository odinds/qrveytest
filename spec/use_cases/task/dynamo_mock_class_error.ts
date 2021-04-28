import { DynamoRepositoryInterface } from '../../../src/app/contracts/dynamo_repository';


export class DynamoMockClassError implements DynamoRepositoryInterface{
    databaseClient: any;

    add(_item: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    get(_id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    scan(_pageSize: number, _search: string, _lastIndex: string): Promise<any> {
        return Promise.reject({});
    }
    updateItem(_id: string, _attributes: any): Promise<any> {
        return Promise.reject({});
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