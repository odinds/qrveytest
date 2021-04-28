import * as Joi from '@hapi/joi';

/**
 * Project validation schema.
 */
export const projectSchema = Joi.object({
  name: Joi.string().min(3).max(30),
});
