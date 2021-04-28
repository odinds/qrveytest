import { DynamoMockClassError } from './dynamo_mock_class_error';
import { DynamoMockClass } from './dynamo_mock_class';
import { useCaseGetAllProjects, useCaseGetAllProjectsWithTask } from '../../../src/use_cases/project/get_all_projects';

describe("get task by user test case", ()=> {
    const dynamoMockClass: DynamoMockClass = new DynamoMockClass();
    const dynamoMockClassError: DynamoMockClassError = new DynamoMockClassError();
    const taskUseCase = useCaseGetAllProjects(dynamoMockClass);
    const taskUseCaseError = useCaseGetAllProjects(dynamoMockClassError);

    const taskUseTaskCase = useCaseGetAllProjectsWithTask(dynamoMockClass,dynamoMockClass);
    const taskUseCaseTaskError = useCaseGetAllProjectsWithTask(dynamoMockClassError,dynamoMockClass);

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

    it('ok get', async () => {
        const idUser = '1';
        const pageSize = 1;
        const lastIndex = '';  
        taskUseTaskCase(pageSize, lastIndex, idUser)
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
       taskUseCaseTaskError(pageSize, lastIndex, idUser)
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