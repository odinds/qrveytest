import { DynamoMockClassError } from './dynamo_mock_class_error';
import { DynamoMockClass } from './dynamo_mock_class';
import { useCaseAddTask } from '../../../src/use_cases/task/add_task';

describe("get create task test case", ()=> {
    let dynamoMockClass: DynamoMockClass = new DynamoMockClass();
    let dynamoMockClassError: DynamoMockClassError = new DynamoMockClassError();
    let addTask = null;


    // For every test case we need UserService instance so before running each test case the UserService instance will be created
    beforeEach(() => {
     
    });
   
    it('ok create', () => {
        addTask = useCaseAddTask(dynamoMockClass);
    
        const task = {
            "name": "prueba",
            "id": "prueba@gmail.com"
        }
        
        addTask(task)
        .then((result: any) => {
            console.log(result);
            //expect(result).toBeTruthy();
        })
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });

    it('fail create', () => {
        addTask = useCaseAddTask(dynamoMockClassError);

        const task = {
            "name": "prueba",
            "id": "prueba@gmail.com"
        }

        addTask(task)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });   

});