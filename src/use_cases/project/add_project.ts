import {makeProject} from "../../entities/model/project/project";
import {DynamoRepositoryInterface} from "../../app/contracts/dynamo_repository";
import {Promise} from 'bluebird';
import * as uuid from 'uuid';

/**
 * Use case to add a project to the repository.
 * @param repository repository that the user needs to be saved.
 * @param sqsClient queue that the id of the user will be sent.
 */
export const useCaseAddProject = (repository: DynamoRepositoryInterface) => (body): Promise<any> => {
  return makeProject(body)
    .then(project => {
      project.id = uuid.v4();
      return Promise.all([
        Promise.resolve(project.id),
        repository.add(project)
      ])
    })
};
