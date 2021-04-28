
import {useCaseGetAllTasksByUser} from "../../../use_cases/task/get_all_tasks_by_user";
import {databaseTaskService,  requestService} from '../../../config/project_dependencies';
import {BaseHttpError} from "../../../frameworks/error/base_http_error";
import {InternalServerException} from "../../../frameworks/error/http_server_error";


const getAllTasksByUser = useCaseGetAllTasksByUser(databaseTaskService.repository);


export const getTasksByUser = async (event, _context): Promise<any> => {
  const {idUser} = event.pathParameters;
  const {pageSize, lastIndex} = event.queryStringParameters || {};

  return getAllTasksByUser(pageSize, lastIndex, idUser)
          .then((result: any) => {
            return requestService.successPaginate(result.items, result.total, result.lastEvaluatedKey)
          })
          .catch(error => {
            if (error instanceof BaseHttpError) return requestService.error(error);
            return requestService.error(new InternalServerException(error));
          });
};

/*
export const getTask = async (event, _context): Promise<any> => {
  const {idUser} = event.pathParameters;

  return getOneTask(idUser)
    .then((result: any) => requestService.success(result.Item))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};
*/