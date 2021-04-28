import {DynamoRepositoryInterface} from "../../app/contracts/dynamo_repository";

/**
 * Get users from a repository.
 * @param repository repository that users will be retrieved.
 */
export const useCaseGetAllProjects = (repository: DynamoRepositoryInterface) => async (pageSize: number, lastIndex: string,
  search: string) => {
  return repository.scan(pageSize, search, lastIndex);
};

/**
 * Get users from a repository.
 * @param repositoryProject repository that users will be retrieved.
 * @param repositoryTask repository that users will be retrieved.
 */
 export const useCaseGetAllProjectsWithTask = (repositoryProject: DynamoRepositoryInterface,repositoryTask: DynamoRepositoryInterface) => async (pageSize: number, lastIndex: string,
  search: string) => {
    var projects = await repositoryProject.scan(pageSize, search, lastIndex);
    
    if(projects.items){
      var projectsWithtask = projects.items;
      await asyncForEach(projectsWithtask, async (pro) => {
        let dataTask = await repositoryTask.scan(pageSize, pro.id, lastIndex)
        pro.totalTask = dataTask.total;
        pro.totalDuration = getDuration(dataTask.items);
        pro.tasks = dataTask.items;
      }); 

      projects.items = projectsWithtask;
    }

    return projects;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

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
