
import * as taskUseCaseModule from "../../../src/use_cases/task/update_task";
import { putPauseTask,putRestartTask,putTaskInProject } from '../../../src/app/controllers/task/update';
const sinon = require("sinon");

describe("create task by user controller:", ()=> {
    let stub = null;
    beforeEach(() => {

    });

    afterEach(() =>{
        stub.restore();
    })
   
    it('ok puase task', async() => {
        stub = sinon.stub(taskUseCaseModule, "useCasePauseTask").returns(Promise.resolve);        

        const data = '{"name": "project"}'

        const event = {
            body: data
        };
        const _context = null;
        await putPauseTask(event,_context);
        expect(stub.calledOnce).toBeTrue;
        
    });

    it('ok restart task', async() => {
        stub = sinon.stub(taskUseCaseModule, "useCaseRestartTask").returns(Promise.resolve);        

        const data = '{"name": "project"}'

        const event = {
            body: data
        };
        const _context = null;
        await putRestartTask(event,_context);
        expect(stub.calledOnce).toBeTrue;
        
    });    

    it('ok task in project task', async() => {
        stub = sinon.stub(taskUseCaseModule, "useCaseRelationProject").returns(Promise.resolve);        

        const data = '{"name": "project"}'

        const event = {
            body: data
        };
        const _context = null;
        await putTaskInProject(event,_context);
        expect(stub.calledOnce).toBeTrue;
        
    });      


});