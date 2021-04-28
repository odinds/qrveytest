import {BaseHttpError} from "../../../frameworks/error/base_http_error";
import {databaseProjectService, requestService} from '../../../config/project_dependencies';
import {useCaseAddProject} from "../../../use_cases/project/add_project";
import {InternalServerException} from "../../../frameworks/error/http_server_error";

const addProject = useCaseAddProject(databaseProjectService.repository);

export const postProject = async (event, _context): Promise<any> => {
  return requestService.validateBody(event.body)
    .then(body => addProject(body))
    .then(promises => requestService.success({id: promises[0]}, 201))
    .catch(error => {
      if (error instanceof BaseHttpError) return requestService.error(error);
      return requestService.error(new InternalServerException(error));
    });
};
