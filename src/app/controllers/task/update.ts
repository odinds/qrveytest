import {databaseTaskService,  requestService} from '../../../config/project_dependencies';
import {BaseHttpError} from "../../../frameworks/error/base_http_error";
import {InternalServerException} from "../../../frameworks/error/http_server_error";
import {useCasePauseTask , useCaseRestartTask} from "../../../use_cases/task/update_task";

const puaseTask = useCasePauseTask(databaseTaskService.repository);
const restartTask = useCaseRestartTask(databaseTaskService.repository);

export const putPauseTask = async (event, _context): Promise<any> => {
  //localeService.setLocale(event.headers['Accept-Language']);
  const {idTask} = event.pathParameters || {};

  return requestService.validateBody(event.body)
    .then(body => puaseTask(idTask, body))
    .then(user => requestService.success(user.Attributes, 200))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};

export const putRestartTask = async (event, _context): Promise<any> => {
  //localeService.setLocale(event.headers['Accept-Language']);
  const {idTask} = event.pathParameters || {};

  return requestService.validateBody(event.body)
    .then(body => restartTask(idTask, body))
    .then(user => requestService.success(user.Attributes, 200))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};

export const putTaskInProject = async (event, _context): Promise<any> => {
  const {idTask} = event.pathParameters || {};

  return requestService.validateBody(event.body)
    .then(body => restartTask(idTask, body))
    .then(user => requestService.success(user.Attributes, 200))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};

