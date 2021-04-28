
import * as taskUseCaseModule from '../../../src/use_cases/task/get_all_tasks_by_user';
import { getTasksByUser } from '../../../src/app/controllers/task/read';
const sinon = require("sinon");

describe("get task by user controller:", ()=> {
    let stub = null;
    beforeEach(() => {

    });

    afterEach(() =>{
        stub.restore();
    })
   
    it('ok task by user', async() => {
        stub = sinon.stub(taskUseCaseModule, "useCaseGetAllTasksByUser").returns(Promise.resolve);        
        
        const event = {
            pathParameters : '1'
        };
        const _context = null;
        await getTasksByUser(event,_context);
        expect(stub.calledOnce).toBeTrue;

    });

    it('fail task by user', async() => {
        stub = sinon.stub(taskUseCaseModule, "useCaseGetAllTasksByUser").returns(Promise.reject);        
        const event = {
            pathParameters : '1'
        };
        const _context = null;
        await getTasksByUser(event,_context);
        expect(stub.calledOnce).toBeTrue;
        
    });

});