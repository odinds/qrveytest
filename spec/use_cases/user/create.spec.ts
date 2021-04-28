import { DynamoMockClassError } from './dynamo_mock_class_error';
import { DynamoMockClass } from './dynamo_mock_class';
import { useCaseAddUser } from '../../../src/use_cases/user/add_user';

describe("get create user test case", ()=> {
    let dynamoMockClass: DynamoMockClass = new DynamoMockClass();
    let dynamoMockClassError: DynamoMockClassError = new DynamoMockClassError();
    let addUser = null;


    // For every test case we need UserService instance so before running each test case the UserService instance will be created
    beforeEach(() => {
     
    });
   
    it('ok create', () => {
        addUser = useCaseAddUser(dynamoMockClass);
    
        const user = {
            "fullName": "prueba",
            "email": "prueba@gmail.com"
        }
        
        addUser(user)
        .then((result: any) => {
            console.log(result);
            //expect(result).toBeTruthy();
        })
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });

    it('fail create', () => {
        addUser = useCaseAddUser(dynamoMockClassError);

        const user = {
            "fullName": "prueba",
            "email": "prueba@gmail.com" 
        }

        addUser(user)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });   

});