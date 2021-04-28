//import Joi from 'joi';
import * as Joi from '@hapi/joi';

/**
 * task validation schema.
 */
export const taskSchema = Joi.object({
  duration: Joi.number().min(1).max(1600),
  measureTime: Joi.string().valid('HOURS', 'MINUTES','SECONDS').uppercase().required(),
  idUser: Joi.string().guid({version: 'uuidv4'}).required(),
  statusT: Joi.string().valid('CREATED', 'PAUSED','RUNNING').uppercase().required(),
});
