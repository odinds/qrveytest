import {BaseHttpError} from "../../../frameworks/error/base_http_error";
import {databaseUserService,  requestService} from '../../../config/project_dependencies';
import {useCaseAddUser} from "../../../use_cases/user/add_user";
import {InternalServerException} from "../../../frameworks/error/http_server_error";

const addUser = useCaseAddUser(databaseUserService.repository);

export const postUser = async (event, _context): Promise<any> => {

  return requestService.validateBody(event.body)
    .then(body => addUser(body))
    .then(promises => requestService.success({id: promises[0]}, 201))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};
