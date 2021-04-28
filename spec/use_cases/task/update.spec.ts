import { DynamoMockClassError } from './dynamo_mock_class_error';
import { DynamoMockClass } from './dynamo_mock_class';
import { useCasePauseTask,useCaseRestartTask,useCaseRelationProject } from '../../../src/use_cases/task/update_task';

describe("get update task test case", ()=> {
    let dynamoMockClass: DynamoMockClass = new DynamoMockClass();
    let dynamoMockClassError: DynamoMockClassError = new DynamoMockClassError();
    let pauseTask = null;
    let restartTask = null;
    let relationProject = null;

    // For every test case we need UserService instance so before running each test case the UserService instance will be created
    beforeEach(() => {
     
    });
   
    it('ok puased', () => {
        pauseTask = useCasePauseTask(dynamoMockClass);
    
        const idTask = '1';
        const task = {
            "measureTime": "MINUTES",
            "idUser": "2f3d86bc-154e-4255-86f5-c8ef79e9a5e4"  
        }

        pauseTask(idTask, task)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });

    it('fail puased', () => {
        pauseTask = useCasePauseTask(dynamoMockClassError);

        const idTask = '1';
        const task = {
            "measureTime": "MINUTES",
            "idUser": "2f3d86bc-154e-4255-86f5-c8ef79e9a5e4"  
        }

        pauseTask(idTask, task)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });   

    it('ok restart', () => {
        restartTask = useCaseRestartTask(dynamoMockClass);

        const idTask = '1';
        const task = {
            "measureTime": "MINUTES",
            "idUser": "2f3d86bc-154e-4255-86f5-c8ef79e9a5e4"  
        }

        restartTask(idTask, task)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });   

    it('fail restart', () => {
        restartTask = useCaseRestartTask(dynamoMockClassError);

        const idTask = '1';
        const task = {
            "measureTime": "MINUTES",
            "idUser": "2f3d86bc-154e-4255-86f5-c8ef79e9a5e4"  
        }

        restartTask(idTask, task)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });       

    it('ok relation poject', () => {
        relationProject = useCaseRelationProject(dynamoMockClass);

        const idTask = '1';
        const task = {
            "measureTime": "MINUTES",
            "idProject": "2f3d86bc-154e-4255-86f5-c8ef79e9a5e4"  
        }

        relationProject(idTask, task)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    });   

    it('fail relation project', () => {
        relationProject = useCaseRelationProject(dynamoMockClassError);

        const idTask = '1';
        const task = {
            "measureTime": "MINUTES",
            "idProject": "2f3d86bc-154e-4255-86f5-c8ef79e9a5e4"  
        }

        relationProject(idTask, task)
        .then((result: any) => {
            expect(result).toBeTruthy();
        } )
        .catch(error => {
            expect(error).toBeTruthy();
        });    
    }); 
});