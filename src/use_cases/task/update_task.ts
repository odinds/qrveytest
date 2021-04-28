import {DynamoRepositoryInterface} from "../../app/contracts/dynamo_repository";
import {makeTask} from "../../entities/model/task/task";
import {UnprocessableEntityException} from "../../frameworks/error/http_client_error";
import {BaseHttpError} from "../../frameworks/error/base_http_error";

/**
 * Pause a task from a repository.
 * @param repository repository that users will be retrieved.
 */
export const useCasePauseTask = (repository: DynamoRepositoryInterface) => async (id: string, task: any) => {
  task.statusT = "PAUSED";
  return makeTask(task,false)
    .then(task => repository.updateItem(id, task))
    .catch(error => {
      if (error instanceof BaseHttpError) throw error;
      throw new UnprocessableEntityException(error);
    });
};


/**
 * Start a task from a repository.
 * @param repository repository that users will be retrieved.
*/
export const useCaseRestartTask = (repository: DynamoRepositoryInterface) => async (id: string, task: any) => {
  task.statusT = "RUNNING";
  return makeTask(task,false)
    .then(product => repository.updateItem(id, product))
    .catch(error => {
      if (error instanceof BaseHttpError) throw error;
      throw new UnprocessableEntityException("");
    });
};


export const useCaseRelationProject = (repository: DynamoRepositoryInterface) => async (id: string, task: any) => {
  return makeTask(task,true)
    .then(product => repository.updateItem(id, product))
    .catch(error => {
      if (error instanceof BaseHttpError) throw error;
      throw new UnprocessableEntityException("");
    });
};