/**
 * Task POJO class.
 */
export type Task = {
  id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isActive?: boolean;
  paused?: boolean;
  stateT?: string;
  duration: number;
  measureTime: string;
  idUser: string;
  idProject?: string;
}
