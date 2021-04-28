import { DynamoBaseRepository } from "./dynamo_base_repository";

const table = process.env.TABLE_USER;

/**
 * Implementation of the DynamoDB repository.
 */
export class DynamoUserRepository extends DynamoBaseRepository {

  constructor(databaseClient) {
    super(databaseClient,table);
  }

}
