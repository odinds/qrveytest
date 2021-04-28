import {BaseHttpError} from "../../../frameworks/error/base_http_error";
import {databaseTaskService,  requestService} from '../../../config/project_dependencies';
import {useCaseAddTask} from "../../../use_cases/task/add_task";
import {InternalServerException} from "../../../frameworks/error/http_server_error";

const addTask = useCaseAddTask(databaseTaskService.repository);

export const postTask = async (event, _context): Promise<any> => {
  return requestService.validateBody(event.body)
    .then(body => addTask(body))
    .then(promises => requestService.success({id: promises[0]}, 201))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};
