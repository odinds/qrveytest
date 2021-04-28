import {makeUser} from "../../entities/model/user/user";
import {DynamoRepositoryInterface} from "../../app/contracts/dynamo_repository";
import {Promise} from 'bluebird';
import * as uuid from 'uuid';


/**
 * Use case to add a user to the repository.
 * @param repository repository that the user needs to be saved.
 * @param sqsClient queue that the id of the user will be sent.
 */
export const useCaseAddUser = (repository: DynamoRepositoryInterface) => (body): Promise<any> => {
  return makeUser(body)
    .then(user => {
      user.id = uuid.v4();
      return Promise.all([
        Promise.resolve(user.id),
        repository.add(user)
      ])
    })
};
