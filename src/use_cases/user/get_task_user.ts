import {DynamoRepositoryInterface} from "../../app/contracts/dynamo_repository";
import { DeletedEntityException, UnprocessableEntityException } from "../../frameworks/error/http_client_error";

/**
 * Get users from a repository.
 * @param repositoryUser repository that users will be retrieved.
 * @param repositoryTask repository that task will be retrieved.
 */
 export const useCaseGetResumeTaskforUser = (repositoryUser: DynamoRepositoryInterface,repositoryTask: DynamoRepositoryInterface) => async (id: any) => {
    return repositoryUser.get(id)
    .then(async result => {
      if (!result || !Object.prototype.hasOwnProperty.call(result, "Item")) {
        throw new UnprocessableEntityException("");
      }

      if (Object.prototype.hasOwnProperty.call(result.Item, "deletedAt")) {
        throw new DeletedEntityException("");
      }
      
      let dataTask = await repositoryTask.scan(undefined, result.Item.id, undefined);
      result.Item.totalTask = dataTask.total;
      result.Item.totalDuration = getDuration(dataTask.items);
      result.Item.tasks = dataTask.items;
      return Promise.resolve(result);
    });     

  };
  
  function getDuration(tasks: any): any {
    var minutes = 0;
    var calc = 0;
    tasks.forEach(task => {
  
      switch (task.measureTime) {
        case 'HOURS':
          calc = (task.duration?task.duration:0)*60;
          break;
        case 'MINUTES':
          calc = task.duration?task.duration:0;
          break;
        case 'SECONDS':
            calc = (task.duration?task.duration:0)/60;
            break;        
        default:
          calc = 0;
      }
      minutes = minutes + calc;
    });
    return minutes;
  }