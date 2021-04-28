import {DatabaseServiceInterface} from "../../../../app/contracts/database_service";
import {DynamoTaskRepository} from "../dynamo_task_repository";
import * as aws from 'aws-sdk';
import * as bluebird from 'bluebird';
import {DynamoRepositoryInterface} from "../../../../app/contracts/dynamo_repository";

/**
 * Implementation of the DynamoDB service.
 */
export class DynamoTaskService implements DatabaseServiceInterface {

  repository: DynamoRepositoryInterface = null;

  constructor() {
    aws.config.setPromisesDependency(bluebird);
    const dynamoClient = new aws.DynamoDB.DocumentClient();
    this.repository = new DynamoTaskRepository(dynamoClient);
  }
}
