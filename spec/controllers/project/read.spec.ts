import * as useCaseGetAll from "../../../src/use_cases/project/get_all_projects";


import { getProjects,getProjectsWithTask } from '../../../src/app/controllers/project/read';
const sinon = require("sinon");

describe("get project by user controller:", ()=> {
    let stub = null;
    beforeEach(() => {

    });

    afterEach(() =>{
        stub.restore();
    })
   
    it('ok project', async() => {
        stub = sinon.stub(useCaseGetAll, "useCaseGetAllProjects").returns(Promise.resolve({lastEvaluatedKey:null,items:[1],total:1}));        
        
        const event = {
            pathParameters : '1'
        };
        const _context = null;
        await getProjects(event,_context);
        expect(stub.calledOnce).toBeTrue;
        
    });

    it('fail project', async() => {
        stub = sinon.stub(useCaseGetAll, "useCaseGetAllProjectsWithTask").returns(Promise.reject);        
        const event = {
            pathParameters : '1'
        };
        const _context = null;
        await getProjectsWithTask(event,_context);
        expect(stub.calledOnce).toBeTrue;

    });

});