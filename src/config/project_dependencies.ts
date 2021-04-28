//import {I18nLocaleService} from "../frameworks/locale/i18n_locale_service";
import {DynamoUserService} from "../frameworks/persistence/dynamodb/services/dynamo_user_service";
import {DynamoTaskService} from "../frameworks/persistence/dynamodb/services/dynamo_task_service";
import {DynamoProjectService} from "../frameworks/persistence/dynamodb/services/dynamo_project_service";
//import {DynamoOfflineTaskService} from "../frameworks/persistence/dynamodb/services/dynamo_offline_task_service";
//import {DynamoOfflineUserService} from "../frameworks/persistence/dynamodb/services/dynamo_offline_user_service";
//import {DynamoOfflineProjectService} from "../frameworks/persistence/dynamodb/services/dynamo_offline_project_service";
import {HttpRequestService} from "../frameworks/request/http/http_request_service";

//export const databaseUserService = process.env.ENV == 'dev' ? new DynamoOfflineUserService() : new DynamoUserService();
//export const databaseTaskService = process.env.ENV == 'dev' ? new DynamoOfflineTaskService() : new DynamoTaskService();
//export const databaseProjectService = process.env.ENV == 'dev' ? new DynamoOfflineProjectService() : new DynamoProjectService();

export const databaseUserService = new DynamoUserService();
export const databaseTaskService =  new DynamoTaskService();
export const databaseProjectService = new DynamoProjectService();
//export const localeService = new I18nLocaleService();
export const requestService = new HttpRequestService();
