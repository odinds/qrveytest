import {DynamoRepositoryInterface} from "../../../app/contracts/dynamo_repository";
import {dynamoDocumentBuilder} from "./dynamo_document_builder";

const dynamoForbiddenWords = ['createdAt'];

/**
 * Implementation of the DynamoDB repository.
 */
export class DynamoBaseRepository implements DynamoRepositoryInterface {

  databaseClient: any = null;
  table: string = null;

  constructor(databaseClient,table:string) {
    this.databaseClient = databaseClient;
    this.table = table;
  }

  add(item: any) {
    const doc = dynamoDocumentBuilder(item);
    const params = {
      TableName: this.table,
      Item: doc
    };

    return this.databaseClient.put(params).promise();
  }

  get(id) {
    const params = {
      TableName: this.table,
      Key: {id: id},
    };

    return this.databaseClient.get(params).promise();
  }

  async scan(pageSize, search, lastIndex) {
    const params: any = {};
    params.TableName = this.table;
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

  updateItem(key, item) {
    const updateParams = this.buildDynamoUpdateExpression(item);
    updateParams.ExpressionAttributeValues[':id'] = key;

    const params = {
      TableName: this.table,
      Key: {id: key},
      ReturnValues: "ALL_NEW",
      ConditionExpression: "id = :id and attribute_not_exists(deletedAt) ",
      UpdateExpression: updateParams.UpdateExpression,
      ExpressionAttributeValues: updateParams.ExpressionAttributeValues,
    };

    return this.databaseClient.update(params).promise();
  }

  removeItem(id) {
    // const params = {
    //   TableName: this.table,
    //   Key: {id: id},
    //   ReturnValues: "ALL_OLD"
    // };

    // return this.databaseClient.delete(params).promise();
    return Promise.resolve({id});
  }

  inactivateItem(key: string) {
    // const currentDate = new Date().toISOString();
    // const newUser = {
    //   deletedAt: currentDate
    // };

    // return this.updateItem(key, newUser);
    return Promise.resolve({key});
  }

  addItemsToArray(id: string, attributes: any): Promise<any> {
    // const updateParams = this.buildDynamoAddItemsToSetExpression(attributes);
    // updateParams.ExpressionAttributeValues[':id'] = id;

    // const params = {
    //   TableName: this.table,
    //   Key: {id: id},
    //   ReturnValues: "ALL_NEW",
    //   ConditionExpression: "id = :id",
    //   UpdateExpression: updateParams.UpdateExpression,
    //   ExpressionAttributeValues: updateParams.ExpressionAttributeValues,
    // };

    //return this.databaseClient.update(params).promise();
    return Promise.resolve({id,attributes});
  }

  removeItemsFromArray(id: string, attributes: any): Promise<any> {
    // const updateParams = this.buildDynamoRemoveItemsFromSetExpression(attributes);
    // updateParams.ExpressionAttributeValues[':id'] = id;

    // const params = {
    //   TableName: this.table,
    //   Key: {id: id},
    //   ReturnValues: "ALL_NEW",
    //   ConditionExpression: "id = :id",
    //   UpdateExpression: updateParams.UpdateExpression,
    //   ExpressionAttributeValues: updateParams.ExpressionAttributeValues,
    // };

    // return this.databaseClient.update(params).promise();
    return Promise.resolve({id,attributes});
  }

  buildDynamoUpdateExpression(modifiedItem): any {
    let updateExpression = "";
    const attributeValues = {};

    for (const [key, value] of Object.entries(modifiedItem)) {
      if (dynamoForbiddenWords.includes(key)) continue;

      if (updateExpression === "") {
        updateExpression = 'set ';
      } else {
        updateExpression = updateExpression + ', ';
      }

      updateExpression = updateExpression + key + ' = :' + key;
      attributeValues[':' + key] = value;
    }

    if (Object.keys(attributeValues).length < 1) return;

    updateExpression = updateExpression + ', updatedAt = :updatedAt';
    attributeValues[':updatedAt'] = new Date().toISOString();

    return {
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: attributeValues
    }
  }

  buildDynamoAddItemsToArrayExpression(items): any {
    return this.buildDynamoArrayUpdateExpression(false, 'set', items);
  }

  buildDynamoAddItemsToSetExpression(items): any {
    return this.buildDynamoArrayUpdateExpression(true, 'add', items);
  }

  buildDynamoRemoveItemsFromSetExpression(items): any {
    return this.buildDynamoArrayUpdateExpression(true, 'delete', items);
  }

  buildDynamoArrayUpdateExpression(isTypeSet: boolean, initialUpdateExpression: string, items: any): any {
    // let updateExpression = "";
    // const attributeValues = {};
    // let count = 0;

    // for (const [key, value] of Object.entries(items)) {
    //   if (updateExpression === "") {
    //     updateExpression = initialUpdateExpression;
    //   } else {
    //     updateExpression = updateExpression + ',';
    //   }

    //   updateExpression = isTypeSet ? `${updateExpression} ${key} :${key}${count}` :
    //     `${updateExpression} ${key} = list_append(if_not_exists(${key}, :emptyList), :${key}${count})`;
    //   attributeValues[`:${key}${count++}`] = isTypeSet ? this.databaseClient.createSet(value) : value;
    // }

    // updateExpression = `${updateExpression}${isTypeSet ? ' set' : ','} updatedAt = :updatedAt`;
    // attributeValues[':updatedAt'] = new Date().toISOString();
    // if (!isTypeSet) attributeValues[':emptyList'] = [];

    // return {
    //   UpdateExpression: updateExpression,
    //   ExpressionAttributeValues: attributeValues
    // }
    return {
      UpdateExpression: isTypeSet,
      ExpressionAttributeValues: initialUpdateExpression,
      dd: items
    }
  }

  /**
   * DynamoDB pagination.
   * @param params dynamodb query params.
   * @param pageSize nmax umber of items to be returned.
   * @param lastIndex id to start database scan.
   */
  async paginate(params, pageSize, lastIndex) {
    let results: any = [];

    while (results.length < pageSize) {
      if (lastIndex) params.ExclusiveStartKey = {id: lastIndex};
      const docs: any = await this.databaseClient.scan(params).promise();
      results = results.concat(docs.Items.slice(0, pageSize - results.length));
      if (!docs.LastEvaluatedKey) break;
      lastIndex = docs.LastEvaluatedKey.id;
    }

    return {
      lastEvaluatedKey: results.length > 0 ? results[results.length - 1].id : null,
      items: results,
      total: results.length
    };
  }
}