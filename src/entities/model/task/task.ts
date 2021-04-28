import {taskValidator} from "./task_validator";
import {taskSchema} from "./task_schema";
import {Task} from "./task_model";
import {InvalidParamsException} from "../../../frameworks/error/http_client_error";
import {Promise} from 'bluebird';

const validator = taskValidator(taskSchema);

/**
 * Task builder, validate and build a {@link Task} object.
 * @param task {@link Task} object.
 */
export const makeTask = (task: Task,validate : boolean): Promise<Task> => {
  return new Promise((resolve, reject) => {
    if (!validate || validator(task)) {
      resolve(task);
    }
    reject(new InvalidParamsException(null));
  })
};
