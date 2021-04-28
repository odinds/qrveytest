import { DynamoBaseRepository } from "./dynamo_base_repository";

const table = process.env.TABLE_PROJECT;

/**
 * Implementation of the DynamoDB repository.
 */
export class DynamoProjectRepository extends DynamoBaseRepository {

  constructor(databaseClient) {
    super(databaseClient,table);
  }

  async scan(pageSize, search, lastIndex) {
    const params: any = {};
    params.TableName = table;
    params.Limit = process.env.DYNAMODB_SCAN_DEFAULT_SIZE;
    pageSize = pageSize || process.env.PAGINATION_DEFAULT_SIZE;

    if (search) {
      params.FilterExpression = 'attribute_not_exists(deletedAt) and (contains(#fullName, :search) or contains(#email, :search))';
      params.ExpressionAttributeValues = {':search': search};
      params.ExpressionAttributeNames = {
        '#fullName': 'fullName',
        '#email': 'email'
      };
    }

    return Promise.resolve(this.paginate(params, pageSize, lastIndex));
  }

}
