import {InvalidParamsException} from "../../../frameworks/error/http_client_error";
import {Task} from "./task_model";

/**
 * Task validator.
 * @param schema validation schema.
 */
export const taskValidator = (schema) => (task: Task): boolean => {
  const result =   schema.validate(task); //oi.validate(task, schema, {abortEarly: false});
  if (result.error) throw new InvalidParamsException(result.error);
  return true;
};
