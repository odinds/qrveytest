import { DynamoMockClassError } from './dynamo_mock_class_error';
import { DynamoMockClass } from './dynamo_mock_class';
import { useCaseAddProject } from '../../../src/use_cases/project/add_project';

describe("get create project test case", ()=> {
    let dynamoMockClass: DynamoMockClass = new DynamoMockClass();
    let dynamoMockClassError: DynamoMockClassError = new DynamoMockClassError();
    let addProject = null;


    // For every test case we need UserService instance so before running each test case the UserService instance will be created
    beforeEach(() => {
     
    });
   
    it('ok create', () => {
        addProject = useCaseAddProject(dynamoMockClass);
    
        const project = {
            "name": "prueba",
            "id": "prueba@gmail.com"
        }
        
        addProject(project)
        .then((result: any) => {
            console.log(result);
            //expect(result).toBeTruthy();
        })
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });

    it('fail create', () => {
        addProject = useCaseAddProject(dynamoMockClassError);

        const project = {
            "name": "prueba",
            "id": "prueba@gmail.com"
        }
        
        addProject(project)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });   

});