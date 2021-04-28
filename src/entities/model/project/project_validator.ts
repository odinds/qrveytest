import {InvalidParamsException} from "../../../frameworks/error/http_client_error";
import {Project} from "./project_model";

/**
 * User validator.
 * @param schema validation schema.
 */
export const projectValidator = (schema) => (project: Project): boolean => {
  const result = schema.validate(project);
  if (result.error) throw new InvalidParamsException(result.error);
  return true;
};
