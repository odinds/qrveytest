
import * as projectUseCaseModule from "../../../src/use_cases/project/add_project";
import { postProject } from '../../../src/app/controllers/project/create';
const sinon = require("sinon");

describe("create project controller:", ()=> {
    let stub = null;
    beforeEach(() => {

    });

    afterEach(() =>{
        stub.restore();
    })
   
    it('ok project', async() => {
        stub = sinon.stub(projectUseCaseModule, "useCaseAddProject").returns(Promise.resolve);        

        const data = '{"name": "project"}'

        const event = {
            body: data
        };
        const _context = null;
        await postProject(event,_context);
        expect(stub.calledOnce).toBeTrue;
        
    });


});