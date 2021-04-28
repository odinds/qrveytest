
import * as userUseCaseModule from "../../../src/use_cases/user/add_user";
import { postUser } from '../../../src/app/controllers/user/create';
const sinon = require("sinon");

describe("create project controller:", ()=> {
    let stub = null;
    beforeEach(() => {

    });

    afterEach(() =>{
        stub.restore();
    })
   
    it('ok project', async() => {
        stub = sinon.stub(userUseCaseModule, "useCaseAddUser").returns(Promise.resolve);        

        const data = '{"fullname": "eje"}'

        const event = {
            body: data
        };
        const _context = null;
        await postUser(event,_context);
        expect(stub.calledOnce).toBeTrue;
        
    });


});