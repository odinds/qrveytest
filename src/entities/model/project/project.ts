import {projectValidator} from "./project_validator";
import {projectSchema} from "./project_schema";
import {Project} from "./project_model";
import {InvalidParamsException} from "../../../frameworks/error/http_client_error";
import {Promise} from 'bluebird';

const validator = projectValidator(projectSchema);

/**
 * Project builder, validate and build a {@link Project} object.
 * @param project {@link Project} object.
 */
export const makeProject = (task: Project): Promise<Project> => {
  return new Promise((resolve, reject) => {
    if (validator(task)) {
      resolve(task);
    }
    reject(new InvalidParamsException(null));
  })
};