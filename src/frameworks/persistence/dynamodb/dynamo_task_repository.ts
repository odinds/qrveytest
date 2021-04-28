
import { DynamoBaseRepository } from "./dynamo_base_repository";


const table = process.env.TABLE_TASK;


/**
 * Implementation of the DynamoDB repository.
 */
export class DynamoTaskRepository extends DynamoBaseRepository {

  constructor(databaseClient){
    super(databaseClient,table);
  }

  async scan(pageSize, search, lastIndex) {
    const params: any = {};
    params.TableName = table;
    params.Limit = process.env.DYNAMODB_SCAN_DEFAULT_SIZE;
    pageSize = pageSize || process.env.PAGINATION_DEFAULT_SIZE;
    params.ScanIndexForward = false;
    if (search) {
      params.FilterExpression = 'attribute_not_exists(deletedAt) and #atribute_name1 = :search or #atribute_name2 = :search';
      params.ExpressionAttributeNames = {
        '#atribute_name1': 'idUser',
        '#atribute_name2': 'idProject'
      };
      params.ExpressionAttributeValues = {
        ':search': search
      };
      
    }

    return Promise.resolve(this.paginate(params, pageSize, lastIndex));
  }

}
