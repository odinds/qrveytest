import {useCaseGetResumeTaskforUser} from "../../../use_cases/user/get_task_user";
import {databaseUserService,databaseTaskService, requestService} from '../../../config/project_dependencies';
import {BaseHttpError} from "../../../frameworks/error/base_http_error";
import {InternalServerException} from "../../../frameworks/error/http_server_error";

const getResumeTaskforUser = useCaseGetResumeTaskforUser(databaseUserService.repository,databaseTaskService.repository);

export const getTaskforUser = async (event, _context): Promise<any> => {
    const {idUser} = event.pathParameters || {};

  return getResumeTaskforUser(idUser)
    .then((result: any) => requestService.success(result.Item))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};