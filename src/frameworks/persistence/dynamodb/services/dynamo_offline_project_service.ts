import {DatabaseServiceInterface} from "../../../../app/contracts/database_service";
import {DynamoProjectRepository} from "../dynamo_project_repository";
import * as aws from 'aws-sdk';
import * as bluebird from 'bluebird';
import config from '../../../../../config/dynamodb/dynamodb-offline.json';
import {DynamoRepositoryInterface} from "../../../../app/contracts/dynamo_repository";

/**
 * Implementation of the DynamoDB offline service.
 */
export class DynamoOfflineProjectService implements DatabaseServiceInterface {

  repository: DynamoRepositoryInterface = null;

  constructor() {
    aws.config.update(config);
    aws.config.setPromisesDependency(bluebird);
    const dynamoClient = new aws.DynamoDB.DocumentClient();
    this.repository = new DynamoProjectRepository(dynamoClient);
  }
}
