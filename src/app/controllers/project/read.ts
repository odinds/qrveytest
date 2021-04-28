import {useCaseGetAllProjects, useCaseGetAllProjectsWithTask} from "../../../use_cases/project/get_all_projects";
import {databaseProjectService,databaseTaskService, requestService} from '../../../config/project_dependencies';
import {BaseHttpError} from "../../../frameworks/error/base_http_error";
import {InternalServerException} from "../../../frameworks/error/http_server_error";

const getAllProjects = useCaseGetAllProjects(databaseProjectService.repository);
const getAllProjectsWithTask = useCaseGetAllProjectsWithTask(databaseProjectService.repository,databaseTaskService.repository);

export const getProjects = async (event, _context): Promise<any> => {
  const {pageSize, lastIndex, search} = event.queryStringParameters || {};

  return getAllProjects(pageSize, lastIndex, search)
    .then((result: any) => {
      return requestService.successPaginate(result.items, result.total, result.lastEvaluatedKey)})
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};


export const getProjectsWithTask = async (event, _context): Promise<any> => {
  const {pageSize, lastIndex, search} = event.queryStringParameters || {};

  return getAllProjectsWithTask(pageSize, lastIndex, search)
    .then((result: any) => requestService.successPaginate(result.items, result.total, result.lastEvaluatedKey))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};