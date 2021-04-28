import { DynamoMockClassError } from './dynamo_mock_class_error';
import { DynamoMockClass } from './dynamo_mock_class';
import { useCaseGetAllTasksByUser } from '../../../src/use_cases/task/get_all_tasks_by_user';

describe("get task by user test case", ()=> {
    const dynamoMockClass: DynamoMockClass = new DynamoMockClass();
    const dynamoMockClassError: DynamoMockClassError = new DynamoMockClassError();
    const taskUseCase = useCaseGetAllTasksByUser(dynamoMockClass);
    const taskUseCaseError = useCaseGetAllTasksByUser(dynamoMockClassError);


    beforeEach(() => {

    });
   
     it('ok get', async () => {
         const idUser = '1';
         const pageSize = 1;
         const lastIndex = '';  
         taskUseCase(pageSize, lastIndex, idUser)
         .then((result: any) => {
             expect(result).toBeTruthy();
             expect(result.items).toBeTruthy();
             expect(result.items.length).toEqual(1);
         } )
         .catch(error => {
            expect(error).toBeTruthy();
         }); 
    });

    it('fail get', async () => {
        const idUser = '1';
        const pageSize = 1;
        const lastIndex = '';   
        taskUseCaseError(pageSize, lastIndex, idUser)
        .then((result: any) => {
            expect(result).toBeTruthy();
            expect(result.items).toBeTruthy();
            expect(result.items.length).toEqual(1);
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });   
    });   
});