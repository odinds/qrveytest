import {makeTask} from "../../entities/model/task/task";
import {DynamoRepositoryInterface} from "../../app/contracts/dynamo_repository";
import {Promise} from 'bluebird';
import * as uuid from 'uuid';


/**
 * Use case to add a task to the repository.
 * @param repository repository that the user needs to be saved.
 * @param sqsClient queue that the id of the user will be sent.
 */
export const useCaseAddTask = (repository: DynamoRepositoryInterface) => (body): Promise<any> => {

  body.statusT = "CREATED";
  return makeTask(body,false)
    .then(task => {
      task.id = uuid.v1(); //uui generate by time

      return Promise.all([
        Promise.resolve(task.id),
        repository.add(task)
      ])
    })
};
